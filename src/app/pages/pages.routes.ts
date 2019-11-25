import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { ProgressComponent } from './progress/progress.component';


const PagesRoutes: Routes = [
    { 
        path: '', 
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'graphics1', component: Graphics1Component },
            { path: 'progress', component:ProgressComponent },
            { path: '', pathMatch:'full', redirectTo:'dashboard' },
    
        ]
    },
]

export const PAGES_ROUTES = RouterModule.forChild (PagesRoutes)