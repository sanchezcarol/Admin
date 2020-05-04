import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';


const PagesRoutes: Routes = [
    { 
        path: '', 
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            { path: 'account-settings', component: AccountSettingsComponent, data: {titulo:"Ajustes"}},
            { path: 'profile', component: ProfileComponent, data: {titulo:'Perfil de Usuario'}},
            { path: 'dashboard', component: DashboardComponent, data: {titulo:"Dashboard"} },
            { path: 'graphics1', component: Graphics1Component, data: {titulo:"Graficas"} },
            { path: 'progress', component:ProgressComponent, data: {titulo:"Progress"} },
            { path: 'promesas', component: PromesasComponent, data: {titulo:"Promesas"}},
            { path: 'rxjs', component: RxjsComponent, data: {titulo:"Rxjs"}},

            //Mantenimiento
            { path: 'users', component: UsersComponent, data: {titulo:'Control de Usuarios'}},
            { path: '', pathMatch:'full', redirectTo:'dashboard' },
    
        ]
    },
]

export const PAGES_ROUTES = RouterModule.forChild (PagesRoutes)