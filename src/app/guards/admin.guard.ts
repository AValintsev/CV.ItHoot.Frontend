import { SnackBarService } from './../services/snack-bar.service';
import { Users } from './../models/users-type';
import { AccountService } from './../services/account.service';
import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, CanActivateChild, Route, UrlSegment, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

function checkerRole(accountService: AccountService, snackBarService: SnackBarService, router: Router): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>{
	if (accountService.isLoggedIn() && (accountService.getStoreRole() === Users[0] || accountService.getStoreRole() === Users[1])) {
		return true
	}
	accountService.logout().subscribe({
		next: () => { router.navigate(['account/login']); },
		error: error => { snackBarService.showDanger('logout error'); console.log('error', error) }
	})
	return false
}

@Injectable({ providedIn: 'root' })

export class AdminGuard implements CanLoad, CanActivate, CanActivateChild {
	constructor(private accountService: AccountService, private router: Router, private snackBarService: SnackBarService) { }
	canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		return checkerRole(this.accountService, this.snackBarService, this.router)
      
	}
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		return checkerRole(this.accountService, this.snackBarService, this.router)
		
	}
	canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		 return checkerRole(this.accountService, this.snackBarService, this.router)
		
	}
}