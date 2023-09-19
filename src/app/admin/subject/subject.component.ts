import { Component, OnInit } from '@angular/core';

import { Subject } from 'src/app/model/subject.model';
import { User} from 'src/app/model/user.model';

import { SubjectRepository } from 'src/app/model/subject.repository';
import { UserRepository } from 'src/app/model/user.repository';


@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  public errorMessage: string;
  public editing: boolean = false;
  public subjects: Subject[] = [];
  private user: User = new User();


  constructor(private subjectRepo: SubjectRepository, private userRepo: UserRepository) {
   }

  ngOnInit(): void {

    this.userRepo.loadUserForUserDetail().subscribe(user => {
      this.user = user;
      this.subjectRepo.getSubjectsByAuthorId(this.user.id).subscribe(data=> {
        this.subjects = data;
      })
    })

  }



}
