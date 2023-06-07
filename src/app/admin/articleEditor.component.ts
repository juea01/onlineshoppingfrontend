import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Article } from "../model/article.model";
import { ArticleRepository } from "../model/article.repository";

@Component({
  templateUrl: "articleEditor.component.html",
  styleUrls: ["articleEditor.component.css"]
})

export class ArticleEditorComponent {

  editing: boolean = false;
  article: Article = new Article();
  maxAllowedImages: number = 2;

  selectedFiles: FileList = null;
  public errorMessage: string;

  constructor(private repository: ArticleRepository, private router: Router, private activeRoute: ActivatedRoute) {
    this.editing = activeRoute.snapshot.params["mode"] == "edit";
    if (this.editing) {
      console.log("Editing")
      //Object.assign(this.article, repository.getArticleDetailById(activeRoute.snapshot.params["id"]));
      repository.getArticleDetailById(activeRoute.snapshot.params["id"]).subscribe(data => {
        console.log(data);
        Object.assign(this.article, data);
      });
    }
  }

  save(form: NgForm) {
    if (form.valid) {
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
