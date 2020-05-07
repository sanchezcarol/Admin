import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyTokenGuard implements CanActivate {

  constructor(public userService:UserService){}



  canActivate(): Promise<boolean | UrlTree> | boolean | UrlTree {
    
    let token = this.userService.token
    let payload = JSON.parse(atob(token.split('.')[1]))
   
    let exp = this.expiredToken(payload.exp)
    if(exp) {
      this.userService.logout()
      return false
    }
    else return this.verifyAndRenew(payload.exp)
  }

  verifyAndRenew(fechExp):Promise<boolean>{

    return new Promise ((resolve,reject) => {

      let tokenExp = new Date( fechExp * 1000) 
      let now = new Date()

      now.setTime( now.getTime() + (4*60*60*1000))

      if(tokenExp.getTime() > now.getTime()) resolve(true)
      else {
        this.userService.renewToken().subscribe( 
          () => {resolve(true)},
          () => {
            this.userService.logout()

            reject(false)
          }
        )
      }

    })

  }

  expiredToken(token:number){

    let now = new Date().getTime() / 1000

    if(token < now) return true 
    else return false

  }



  
}
