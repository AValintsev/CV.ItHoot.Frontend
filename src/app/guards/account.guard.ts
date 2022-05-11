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

export class AccountGuard implements CanLoad, CanActivate {
	constructor(private accountService: AccountService, private router: Router) { }
	canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		console.log('route', route)
		console.log('segments', segments)
		if (this.accountService.isLoggedIn()) {
			return false
		}
		return true
	}
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		if (this.accountService.isLoggedIn()) {
			return false
		}
		return true
	}
}
