import { SnackBarService } from './../services/snack-bar.service';
import { Users } from './../models/users-type';
import { AccountService } from './../services/account.service';
import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, CanActivateChild, Route, UrlSegment, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({providedIn:'root'})

export class AdminGuard implements CanLoad,CanActivate,CanActivateChild{
  constructor(private accountService:AccountService, private router:Router, private snackBarService:SnackBarService){}
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
	  if (this.accountService.isLoggedIn() && (this.accountService.getStoreRole() === Users[0] || this.accountService.getStoreRole() === Users[1])){
		  console.log('canLoad',true)
		  return  true
	  }
	  this.accountService.logout().subscribe({
		  next:()=>{this.router.navigate(['account/login']);},
		  error: error => { this.snackBarService.showDanger('logout error'); console.log('error',error)}
	  })
	  console.log('canLoad', false)
	  return false
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
	  if (this.accountService.isLoggedIn() && this.accountService.getStoreRole() === Users[0] && this.accountService.getStoreRole() === Users[1]) {
		  return true
	  }
	  return false
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
	  if (this.accountService.isLoggedIn() && this.accountService.getStoreRole() === Users[0] && this.accountService.getStoreRole() === Users[1]) {
		  return true
	  }
	  return false
  }
}