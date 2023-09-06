import { Component, OnInit } from '@angular/core';

import { Subject } from 'src/app/model/subject.model';
import { SubjectRepository } from 'src/app/model/subject.repository';
import { SkillLevel, getSkillLevelValue } from "../../service/constants";


@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  public errorMessage: string;
  public editing: boolean = false;

  public subjects: Subject[] = [];
  public subject: Subject = new Subject();
  public skillLevel: number;
  public localSkillLevel;

  constructor(private subjectRepo: SubjectRepository) {
    this.skillLevel = getSkillLevelValue(SkillLevel.Beginner);
    this.getSubjectByLevel(this.skillLevel);
    this.localSkillLevel = SkillLevel;
   }

  ngOnInit(): void {
  }

  getSubjectByLevel(level: number = 1) {
    this.subjectRepo.getSubjectsByLevel(level).subscribe(data => {
      this.subjects = data;
    })
  }



  getSkillLevelValue(skillLevel: string): number {
    return  getSkillLevelValue(skillLevel);
  }

}
