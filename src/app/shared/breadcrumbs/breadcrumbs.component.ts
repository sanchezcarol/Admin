import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  label:string = ''
  constructor(private router:Router, private title:Title, private meta:Meta) {

    this.getDataRoute()
    .subscribe(event => {
      
      this.label = event.titulo
      this.title.setTitle(this.label)
      let metaTag:MetaDefinition = {
        name:"description",
        content:this.label

      }
      this.meta.updateTag(metaTag);

    })



  }

  ngOnInit() {
  }

  getDataRoute(){
    return this.router.events
    .pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event:ActivationEnd) => event.snapshot.firstChild === null),
      map( event => event.snapshot.data)
    )
  }

}
