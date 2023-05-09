import { Injectable, ComponentFactoryResolver, ComponentRef, ViewContainerRef } from '@angular/core';
import { ArticleComponent } from '../articles/article.component';

@Injectable({
  providedIn: 'root'
})
export class ArticleComponentService {
  componentRef: ComponentRef<ArticleComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  createComponent(containerRef: ViewContainerRef) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ArticleComponent);
    this.componentRef = containerRef.createComponent(componentFactory);
  }

  destroyComponent() {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}
