import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'src/app/model/subject.model';
import { SubjectRepository } from 'src/app/model/subject.repository';
import { Question } from 'src/app/model/question.model';

@Component({
  selector: 'app-question-answer-editor',
  templateUrl: './question-answer-editor.component.html',
  styleUrls: ['./question-answer-editor.component.css']
})
export class QuestionAnswerEditorComponent implements OnInit {

  public subject: Subject = new Subject();
  public questions: Question[] = [];
  private mode: String = "edit";

  constructor(private activatedRoute:ActivatedRoute, private router:Router, subjectRepository: SubjectRepository) {
    let id = activatedRoute.snapshot.params["id"];
    console.log("Subject Id "+id);
    subjectRepository.getSubjectsById(id).subscribe(data=>{
      this.subject = data;
      console.log("Subject is "+this.subject.category+this.subject.id);
      subjectRepository.getQuestionsBySubjectId(this.subject.id).subscribe( data => {
        this.questions = data;
      });
    })
  }

  ngOnInit(): void {
  }

  addQuestion() {
    this.router.navigate([`/admin/main/questions/${this.mode}/${this.subject.id}`]);
  }

}
