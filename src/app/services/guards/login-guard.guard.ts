import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  
  constructor( private userService : UserService, private router:Router ) {}

  canActivate() {
      
    return (this.userService.loggedIn() ? true : this.router.navigate(['/login']) )

  }
  
}
