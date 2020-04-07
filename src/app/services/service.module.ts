import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from './settings/settings.service';
import { SharedService } from './shared/shared.service';
import { SidebarService } from './shared/sidebar.service';



@NgModule({
  providers: [
    SettingsService,
    SharedService,
    SidebarService
  ],
  imports: [
    CommonModule
  ],
  
})
export class ServiceModule { }
