import { Users } from './../models/users-type';
import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanLoad,
	Route,
	Router,
	RouterStateSnapshot,
	UrlSegment,
	UrlTree
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';


@Injectable({
	providedIn: 'root'
})

export class UserCvListGuard implements CanLoad, CanActivate {
	constructor(private accountService: AccountService, private router: Router) { }
	canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		if (this.accountService.getStoreRole()===Users[2]) {
			// this.router.navigate
			return false
		}
		return true
	}
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		if (this.accountService.getStoreRole() === Users[2]) {
			// this.router.navigate
			return false
		}
		return true
	}
}
