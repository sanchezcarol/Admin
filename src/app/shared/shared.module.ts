import { NgModule } from "@angular/core";
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations:[
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent,
        PagenotfoundComponent
    ],
    exports:[
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent,
        PagenotfoundComponent
    ],
    imports:[
        CommonModule,
        RouterModule
    ]
})

export class SharedModule { }