import { NgModule } from "@angular/core";
import { FormsModule} from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { ProgressComponent } from './progress/progress.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { IncrementComponent } from '../components/increment/increment.component';

import { PAGES_ROUTES } from './pages.routes';
import { GraphicsDoughnutComponent } from '../components/graphics-doughnut/graphics-doughnut.component';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graphics1Component,
        PagesComponent,
        IncrementComponent,
        GraphicsDoughnutComponent,
        AccountSettingsComponent
    ],
    exports:[
        DashboardComponent,
        ProgressComponent,
        Graphics1Component
    ],
    imports:[
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        CommonModule    
    ]
})

export class PagesModule{ }