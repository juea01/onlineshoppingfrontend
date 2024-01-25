import { Component, OnInit } from '@angular/core';
import {Subject} from "../../model/subject.model";
import { SubjectRepository } from '../../model/subject.repository';
import { UserSubject } from 'src/app/model/userSubject.model';
import { User } from 'src/app/model/user.model';
import { UserRepository } from "src/app/model/user.repository";
import { SkillLevel, getSkillLevelValue } from "../../service/constants";
import { ValueStoreService } from 'src/app/service/value-store.service';
import { Router } from '@angular/router';

import { filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {  KeycloakService } from 'keycloak-angular';

import * as _ from 'lodash';

@Component({
  selector: 'app-questions',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  public subjectList: Subject[] = [];
  userSubjects: UserSubject[] = [];
  user = new User();
  public skillLevel: number;
  public localSkillLevel;
  public errorMessage: string;

  constructor(private repository: SubjectRepository, private userRepository: UserRepository,
    private activatedRoute: ActivatedRoute, private router: Router, private valueStoreService: ValueStoreService, private keycloak: KeycloakService) {

   }

  ngOnInit(): void {
    //this.getSubjects();
    this.userRepository.loadUserForUserDetail().pipe(
      filter(data => data !== null)
      ).subscribe(
      user => {
        this.user = user;
        console.log(`User role is ${this.user.role}`);
        this.getUserSubjects();
      }, errorMessage => {

      });

      if (this.activatedRoute.snapshot.params["level"]){
        this.skillLevel = this.activatedRoute.snapshot.params["level"];
      } else {
        this.skillLevel = getSkillLevelValue(SkillLevel.Beginner);
      }
      this.getSubjectByLevel(this.skillLevel);
      this.localSkillLevel = SkillLevel;
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

  isPremiumUser() {
    return this.keycloak.getUserRoles().includes("PREMIUM");
  }

  isAdminUser() {
    return this.keycloak.getUserRoles().includes("ADMIN");
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

  getSubjectByLevel(level: number = 1) {
    this.errorMessage = null;
    this.skillLevel = level;
    this.subjectList = null;
    this.repository.getSubjectsByLevel(level).subscribe(data => {
      this.subjectList = data;
      if (_.isEmpty( this.subjectList)) {
        this.errorMessage = "Sorry, there is no practice tests for the choosen level at the moment."
      }
    })

  }

  getSkillLevelValue(skillLevel: string): number {
    return  getSkillLevelValue(skillLevel);
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

  navigateToQuestionDetail(id: string, level: string, isPremium: boolean) {
    this.valueStoreService.setItemPremium(isPremium);
    this.router.navigate(['/myaccount/main/subjectdetail', id, level, isPremium]);
  }

  navigateToPayment() {
    this.router.navigate(['/myaccount/main/payment']);
  }

}
