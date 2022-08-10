import {SnackBarService} from './../services/snack-bar.service';
import {AccountService} from './../services/account.service';
import {Injectable} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';

function checkerRole(accountService: AccountService, snackBarService: SnackBarService, router: Router, data: string[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>{
	if (data&&data.includes(accountService.getStoreRole() as string)){
		return true
	}
	router.navigate(['account/login']);

	return false
}

@Injectable({ providedIn: 'root' })

export class UsersGuard implements CanLoad, CanActivate, CanActivateChild {
	constructor(private activatedRoute:ActivatedRoute, private accountService: AccountService, private router: Router, private snackBarService: SnackBarService) { }
	canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		return checkerRole(this.accountService, this.snackBarService, this.router, route.data!.role)
	}
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		return checkerRole(this.accountService, this.snackBarService, this.router, route.data!.role)

	}
	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		return checkerRole(this.accountService, this.snackBarService, this.router, route.data!.role)

	}
}
