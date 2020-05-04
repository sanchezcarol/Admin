import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'

import {
  SettingsService,
  SharedService,
  SidebarService,
  UserService
} from './service.index'
import { LoginGuardGuard } from './guards/login-guard.guard';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

@NgModule({
  providers: [
    SettingsService,
    SharedService,
    SidebarService,   
    UserService,
    LoginGuardGuard,
    ModalUploadService
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  
})
export class ServiceModule { }
