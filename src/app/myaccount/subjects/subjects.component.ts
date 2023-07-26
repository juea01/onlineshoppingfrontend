import { Component, OnInit } from '@angular/core';
import {Subject} from "../../model/subject.model";
import { SubjectRepository } from '../../model/subject.repository';
import { UserSubject } from 'src/app/model/userSubject.model';
import { User } from 'src/app/model/user.model';
import { UserRepository } from "src/app/model/user.repository";

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-questions',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  public subjectList: Subject[] = [];
  userSubjects: UserSubject[] = [];
  user = new User();

  constructor(private repository: SubjectRepository, private userRepository: UserRepository) {
    this.getSubjects();
    this.userRepository.loadUserForUserDetail().pipe(
      filter(data => data !== null)
      ).subscribe(
      user => {
        this.user = user;
        this.getUserSubjects();
      }, errorMessage => {

      });
   }

  ngOnInit(): void {
  }

  getSubjects() {
     this.repository.getSubjectsByLevel(1).subscribe(data => {
      this.subjectList = data;
    });
  }

  getUserSubjects() {
    this.repository.getAllUserSubjectsForUser(this.user.id).subscribe(data => {
      this.userSubjects = data;
    })
  }

  getWindowInnerWidth():number {
    return window.innerWidth;
  }

  getWindowInnerHeight():number {
    return window.innerHeight;
  }

  getMainContainerHeight():number {
    return document.querySelector('#main-container').clientHeight;
  }

  getOptimalMainContainerHeight():string {
    if (this.getMainContainerHeight() >= this.getWindowInnerHeight()) {
      let pixel = this.getMainContainerHeight();
      return pixel+"px";
    } else {
      //footer is 200px and nav is around 50px
      let pixel = (this.getWindowInnerHeight() - (200+this.getMainContainerHeight())) +this.getMainContainerHeight();
      return this.getWindowInnerHeight()+200+"px";
    }
  }

}
