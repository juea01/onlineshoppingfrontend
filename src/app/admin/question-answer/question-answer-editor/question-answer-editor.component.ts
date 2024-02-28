import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'src/app/model/subject.model';
import { SubjectRepository } from 'src/app/model/subject.repository';
import { Question } from 'src/app/model/question.model';

@Component({
  selector: 'app-question-answer-editor',
  templateUrl: './question-answer-editor.component.html',
  styleUrls: ['./question-answer-editor.component.css'],
})
export class QuestionAnswerEditorComponent implements OnInit {
  public subject: Subject = new Subject();
  public questions: Question[] = [];
  private mode: String = 'edit';
  public errorMessage: string;
  public successMessage: string;

  constructor(
    private activatedRoute: ActivatedRoute, private router: Router, private subjectRepository: SubjectRepository
  ) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    console.log('Subject Id ' + id);
    this.subjectRepository.getSubjectsById(id).subscribe((data) => {
      this.subject = data;
      console.log('Subject is ' + this.subject.category + this.subject.id);
      this.subjectRepository
        .getQuestionsBySubjectId(this.subject.id)
        .subscribe((data) => {
          this.questions = data;
        });
    });
  }

  addQuestion() {
    this.router.navigate([
      `/admin/main/questions/${this.mode}/${this.subject.id}`,
    ]);
  }

  publish() {
    if (!this.subject.publish) {
      //publish this exercise
      this.subject.publish = true;
      this.updateSubject();
    } else {
      //unpublish this exercise
      this.subject.publish = false;
      this.updateSubject();
    }
  }

  updateSubject() {
    this.subjectRepository.updateSubject(this.subject).subscribe(data => {
      this.errorMessage = null;
      this.subject = data;
      this.successMessage = `This exercise has been successfully ${this.subject.publish ? 'published': 'unpublished'}.`;
     }, error=> {
      this.errorMessage = "Something went wrong. Please try again later or contact admin";
      this.successMessage = null;
     })
  }
}
