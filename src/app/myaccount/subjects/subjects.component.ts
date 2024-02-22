import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {Subject} from "../../model/subject.model";
import { SubjectRepository } from '../../model/subject.repository';
import { UserSubject } from 'src/app/model/userSubject.model';
import { User } from 'src/app/model/user.model';
import { UserRepository } from "src/app/model/user.repository";
import { SkillLevel, getSkillLevelValue, SubCategory } from "../../service/constants";
import { ValueStoreService } from 'src/app/service/value-store.service';
import { Router, ActivatedRoute } from '@angular/router';

import { filter } from 'rxjs/operators';
import {  KeycloakService } from 'keycloak-angular';

import * as _ from 'lodash';

import { SHARED_STATE, SharedState } from "../sharedstate.model";
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-questions',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit, OnDestroy {
  public subjectList: Subject[] = [];
  userSubjects: UserSubject[] = [];
  user = new User();
  public skillLevel: number;
  public subCategory: string;
  public localSkillLevel;
  public errorMessage: string;

  constructor(private repository: SubjectRepository, private userRepository: UserRepository,
    private router: Router, private activatedRoute:ActivatedRoute, private valueStoreService: ValueStoreService,
    private keycloak: KeycloakService,
    @Inject(SHARED_STATE) public stateEvents: Observable<SharedState>,
    @Inject(SHARED_STATE) public subjectStateObserver: Observer<SharedState>) {

   }

  ngOnInit(): void {
    //this.getSubjects();
    this.userRepository.loadUserForUserDetail().pipe(
      filter(data => data !== null)
      ).subscribe(
      user => {
        this.user = user;
        this.getUserSubjects();
      }, errorMessage => {

      });

      //default skill level and sub category
      this.skillLevel = getSkillLevelValue(SkillLevel.Beginner);
      this.subCategory = SubCategory.Java;

      if(this.activatedRoute.snapshot.params["subCategory"]){
        this.subCategory = this.activatedRoute.snapshot.params["subCategory"];
      }

      /**
       * Subscribe to event that trigger value change in sub Category
       */
      this.stateEvents.subscribe(update => {
        if(update.subCategory != undefined) {
          this.subCategory = update.subCategory;
          this.getSubjectBySubCaterogyLevel(this.skillLevel, this.subCategory);
        } else {
          this.subCategory = SubCategory.Java;
        }
      })

      this.getSubjectBySubCaterogyLevel(this.skillLevel, this.subCategory);
      this.localSkillLevel = SkillLevel;

      //Emit Subject component Initiated event to subscribers
      this.subjectStateObserver.next(new SharedState(null,true));
  }

  ngOnDestroy(): void {
      //Emit Subject component Destroy event to subscribers
      this.subjectStateObserver.next(new SharedState(null,false));
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

  getSubjectBySubCaterogyLevel(level: number = 1, subCategory: string=SubCategory.Java) {
    this.errorMessage = null;
    this.skillLevel = level;
    this.subjectList = null;
    this.repository.getSubjectsByLevelAndSubCategory(level, subCategory).subscribe(data => {
      this.subjectList = data;
      if (_.isEmpty( this.subjectList)) {
        this.errorMessage = "Sorry, there are no practice tests available for the chosen subject and level at the moment. Please try selecting a different subject or level."
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
