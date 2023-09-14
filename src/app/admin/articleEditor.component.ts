import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Article } from "../model/article.model";
import { ArticleRepository } from "../model/article.repository";
import { UserRepository } from "../model/user.repository";

import { filter } from 'rxjs/operators';
import { User } from "../model/user.model";

@Component({
  templateUrl: "articleEditor.component.html",
  styleUrls: ["articleEditor.component.css"]
})

export class ArticleEditorComponent implements OnInit{

  editing: boolean = false;
  article: Article = new Article();
  maxAllowedImages: number = 2;
  selectedFiles: FileList = null;
  public errorMessage: string;
  private user: User = new User();

  constructor(private repository: ArticleRepository, private router: Router, private activeRoute: ActivatedRoute,
    private userRepository: UserRepository) {

  }

  ngOnInit(): void {
    this.editing = this.activeRoute.snapshot.params["mode"] == "edit";

    if (this.editing) {
      this.repository.getArticleDetailById(this.activeRoute.snapshot.params["id"]).subscribe(data => {
        Object.assign(this.article, data);
      });
    }

    this.userRepository.loadUserForUserDetail().pipe(
      filter(data => data !== null)
      ).subscribe(
      user => {
      this.user = user;
     // console.log("Success"+this.user.id+this.user.username);
      }, error => {
        //console.log(error);
      });
  }

  save(form: NgForm) {
    if (form.valid) {
      this.article.user = this.user;
      this.repository.saveArticle(this.article).subscribe(aId =>{
        const formData = new FormData();
        if (this.article.images) {
          for (let i = 0; i < (this.maxAllowedImages -  this.article.images.length) && i < this.selectedFiles?.length; i++) {
            formData.append('file', this.selectedFiles[i], aId+"_"+this.selectedFiles[i].name);
         }
        } else {
          for (let i = 0; i < this.maxAllowedImages  && i < this.selectedFiles?.length; i++) {
            formData.append('file', this.selectedFiles[i], aId+"_"+this.selectedFiles[i].name);
         }
        }

        formData.append('articleId', aId.toString());
        this.repository.saveImage(formData, this.article.id);
        this.router.navigateByUrl("/admin/main/articles");
      });
    } else {
      this.errorMessage = "Form Data Invalid";
    }

  }

  removeImage(event: Event, imageId: number) {
    event.preventDefault();
    this.repository.deleteImage(imageId, this.article.id).subscribe( a => {
      Object.assign(this.article, a);
    });
  }


  onFileSelected(event) {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
  }

}
