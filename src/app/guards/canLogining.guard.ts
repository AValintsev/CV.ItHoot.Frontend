import { SnackBarService } from './../services/snack-bar.service';
import { AccountService } from './../services/account.service';
import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';



@Injectable({ providedIn: 'root' })

export class CanLoginingGuard implements CanActivate {
	constructor(private accountService: AccountService, private router: Router, private snackBarService: SnackBarService) { }
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		if(this.accountService.isLoggedIn())return false
        return true

	}
}