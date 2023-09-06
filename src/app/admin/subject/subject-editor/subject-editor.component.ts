import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Subject } from 'src/app/model/subject.model';
import * as _ from 'lodash';
import {Router, ActivatedRoute} from "@angular/router";
import { SubjectRepository } from 'src/app/model/subject.repository';

import { SkillLevel, getSkillLevelValue } from "../../../service/constants";

@Component({
  selector: 'app-subject-editor',
  templateUrl: './subject-editor.component.html',
  styleUrls: ['./subject-editor.component.css']
})
export class SubjectEditorComponent implements OnInit {

  public errorMessage: string;
  public editing: boolean = false;
  public subject: Subject = new Subject();
  public skillLevel: number;
  public localSkillLevel;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private subjectRepository: SubjectRepository) {
    this.skillLevel = getSkillLevelValue(SkillLevel.Beginner);
    this.localSkillLevel = SkillLevel;
    this.editing = activatedRoute.snapshot.params["mode"] == "edit";

    if(this.editing) {
      this.subjectRepository.getSubjectsById(activatedRoute.snapshot.params["id"]).subscribe(data=> {
        this.subject = data;
      })
    }
   }

  ngOnInit(): void {
  }

  update(form: NgForm) {
    if (form.valid) {
       this.subjectRepository.updateSubject(this.subject).subscribe(data => {
        this.router.navigate([`/admin/main/questionanswereditor/${this.subject.id}`]);
       }, error=> {
        this.errorMessage = "Something went wrong. Please try again later or contact admin";
       })
    } else {
      this.errorMessage = "Form Data Invalid";
    }
  }


  getSubjectByLevel(level: number = 1) {
    // this.subjectRepo.getSubjectsByLevel(level).subscribe(data => {
    //   this.subjects = data;
    // })
    console.log("Level"+level);
  }

  addQuestion(event: Event) {
    event.preventDefault();
    let mode: string = "CREATE";

    if(_.isEmpty(this.subject.category) || _.isEmpty(this.subject.subCategory) || _.isEmpty(this.subject.title)
        || _.isEmpty(this.subject.premium) || _.isEmpty(this.subject.level)) {
          this.errorMessage = "Please select required fields for Subject before adding questions.";
        } else {
          //save temporarily in local subject repo as component will be destroyed if navigate to another page
          this.router.navigate([`/admin/main/questions/${mode}`], {
            //Note: This scenario of using query params for navigating this.subject object and
             //storing some of login user info in session need to be refactor using Redux or @ngrx/store
            queryParams: this.subject
          });
        }
  }

  getSkillLevelValue(skillLevel: string): number {
    return  getSkillLevelValue(skillLevel);
  }

}
