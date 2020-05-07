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
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { MedicsComponent } from './medics/medics/medics.component';
import { MedicComponent } from './medics/medics/medic.component';
import { SearchComponent } from './search/search.component';

@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graphics1Component,
        PagesComponent,
        IncrementComponent,
        GraphicsDoughnutComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsersComponent,
        ModalUploadComponent,
        HospitalsComponent,
        MedicsComponent,
        MedicComponent,
        SearchComponent,
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
        CommonModule  ,
        PipesModule  
    ]
})

export class PagesModule{ }