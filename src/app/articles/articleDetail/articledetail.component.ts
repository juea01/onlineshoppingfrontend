import { Component, OnInit, ElementRef } from '@angular/core';
import { Article } from '../../model/article.model';
import { ArticleRepository } from '../../model/article.repository';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Comment } from '../../model/comment.model';
import {  KeycloakService } from 'keycloak-angular';
import { User } from '../../model/user.model';
import { Reply } from '../../model/reply.model';
import { UserRepository } from '../../model/user.repository';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';

import { filter } from 'rxjs/operators';
import { TermsDialogComponent } from '../../service/terms-dialog.component';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-articledetail',
  templateUrl: './articledetail.component.html',
  styleUrls: ['./articledetail.component.css'],
  providers: [DatePipe],
})
export class ArticleDetailComponent implements OnInit {
  article: Article = new Article();
  navArticleList: Article[] = [];
  comment: Comment = new Comment();
  reply: Reply = new Reply();
  user = new User();
  public errorMessage: string;
  replies: Reply[] = [];
  showRepliesOfComment: number = 0;
  replyExist: boolean = false;
  private hasInitiated: boolean = false;

  constructor(
    private repository: ArticleRepository,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userRepository: UserRepository,
    private dialog: MatDialog,
    private keycloak: KeycloakService,
    private datePipe: DatePipe,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.repository
      .getArticleDetailById(this.activatedRoute.snapshot.params['id'])
      .subscribe((article) => {
        this.article = article;
        //Scroll to top of the page when the component initializes
        this.elementRef.nativeElement.ownerDocument.defaultView.scrollTo({ top: 0, behavior: 'smooth' });
      });

      this.repository.getRelatedArticlesById(this.activatedRoute.snapshot.params['id']).subscribe((articleList) => {
        this.navArticleList = articleList;
      })

    this.userRepository
      .loadUserForUserDetail()
      .pipe(filter((data) => data !== null))
      .subscribe(
        (user) => {
          console.log('Success');
          this.user = user;
        },
        (error) => {
          console.log(error);
        }
      );

    /**
     * This is for navigating through next and previous article buttons.
     * This is needed as Angular is not recreating same component if navigating from same component.
     */
    this.activatedRoute.paramMap.subscribe((params) => {
      if (this.hasInitiated) {
        this.repository
          .getArticleDetailById(this.activatedRoute.snapshot.params['id'])
          .subscribe((article) => {
            this.article = article;
             //Scroll to top of the page when the component initializes
            this.elementRef.nativeElement.ownerDocument.defaultView.scrollTo({ top: 0, behavior: 'smooth' });
          });
      } else {
        this.hasInitiated = true;
      }
    });


  }

  postComment(form: NgForm) {
    if (form.valid) {
      this.errorMessage = null;
      console.log('Valid Form');
      this.comment.id = 0;
      console.log(this.comment.description);
      //fill with article id and logged in user id
      this.comment.article = this.article;
      this.comment.user = this.user;
      this.repository.saveComment(this.comment).subscribe(
        (value) => {
          this.article.comments.push(value);
          this.comment.description = '';
          // put the returned comment on Article's Comment array that UI loop through
        },
        (error) => {
          /**
           * This scenario is unique as user has been logged in but session/token could have been expired because of inactivity
           */
          if (error.includes('401')) {
            this.errorMessage = 'Please login to post a comment.';
          } else {
            this.errorMessage = error;
          }
        }
      );
    } else {
      this.errorMessage = 'Form Data Invalid';
    }
  }

  getTrimmedPublishDate(): string {
    return this.datePipe.transform(this.article.publishDate, 'yyyy-MM-dd');
  }

  getTrimmedLastEditedDate(): string {
    return this.datePipe.transform(this.article.lastEditDate, 'yyyy-MM-dd');
  }

  isPremiumUser() {
    if (this.keycloak.isLoggedIn()) {
      return this.keycloak.getUserRoles().includes("PREMIUM");
    } else {
      return false;
    }
  }

  isAdminUser() {
    if (this.keycloak.isLoggedIn()) {
      return this.keycloak.getUserRoles().includes("ADMIN");
    } else {
      return false;
    }
  }

  isLoggedIn() {
    if (this.keycloak.isLoggedIn()) {
      return true;
    }
    return false;
  }

  getRepliesByArticleAndCommentId(articleId: number, commentId: number) {
    this.showRepliesOfComment = commentId;
    this.replyExist = false;
    this.repository
      .getRepliesByArticleAndCommentId(articleId, commentId)
      .subscribe((result) => {
        if (result.length > 0) {
          this.replyExist = true;
          this.replies = result;
        }
      });
  }

  navigateToNextArticle(nextArticleId: number) {
    this.router.navigate(['articleDetail', nextArticleId]);
  }

  getRandomQuote(): string {
   const quoteNum =  Math.floor( Math.random()*3)+1;
    return "https://tech-district-nanobit.s3.ap-southeast-2.amazonaws.com/Quote"+quoteNum+".jpg";
  }

  // postRepliesByCommentId(id: number) {
  //   this.showRepliesOfComment = id;
  //   this.repository.postRepliesByCommentId(id).subscribe(result=>{
  //     this.replies=result;

  //   });
  // }

  // checkIfUserLoggedIn(): User {
  //   this.user = null;
  //   this.user = JSON.parse(sessionStorage.getItem('userdetails'));
  //   return this.user;
  // }

  openDialog(
    commentId: number,
    replyId: number,
    mode: string,
    userComment?: string
  ) {
    const dialogConfig = {
      data: {
        comment: userComment,
      },
    };

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Pop up dialog' + commentId + result?.comment);

      if (result?.comment?.length > 10) {
        this.errorMessage = null;
        //for edit mode
        if (mode == 'edit') {
          if (replyId == 0) {
            this.comment.article = this.article;
            this.comment.user = this.user;
            this.comment.id = commentId;
            this.comment.description = result.comment;

            this.repository.saveComment(this.comment).subscribe((value) => {
              // put the returned comment on Article's Comment array that UI loop through
              this.article.comments.splice(
                this.article.comments.findIndex((c) => c.id == value.id),
                1,
                value
              );
              this.comment.description = '';
            });
          } else {
            //here for updating reply
            this.reply.description = result.comment;
            this.reply.id = replyId;

            let user: User = new User();
            user.id = this.user.id;
            this.reply.user = user;

            let comment: Comment = new Comment();
            comment.id = commentId;
            this.reply.comment = comment;

            let article: Article = new Article();
            article.id = this.article.id;
            this.reply.article = article;

            this.repository.postReplies(this.reply).subscribe((result) => {
              this.replies.splice(
                this.replies.findIndex((r) => r.id == result.id),
                1,
                result
              );
              this.reply.id = 0;
            });
          }
        }
        //for reply mode
        if (mode == 'reply') {
          this.reply.description = result.comment;

          let user: User = new User();
          user.id = this.user.id;
          this.reply.user = user;

          let comment: Comment = new Comment();
          comment.id = commentId;
          this.reply.comment = comment;

          let article: Article = new Article();
          article.id = this.article.id;
          this.reply.article = article;

          this.repository.postReplies(this.reply).subscribe((result) => {
            this.replies.push(result);
          });
        }
      }
    });
  }

  navigateToMyAccountLogin() {
    window.sessionStorage.setItem('navigatedFromarticleDetail', 'true');
    window.sessionStorage.setItem(
      'articleId',
      this.activatedRoute.snapshot.params['id']
    );
    this.router.navigate(['myaccount']);
  }

  openTermsDialog(event: Event): void {
    event.preventDefault();

    const dialogConfig = {
      data: {
        isAcceptDecline: false,
      },
    };

    const dialogRef = this.dialog.open(TermsDialogComponent, dialogConfig);
  }
}