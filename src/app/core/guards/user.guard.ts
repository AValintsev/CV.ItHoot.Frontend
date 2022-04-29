import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';

export class UserGuard implements CanLoad,CanActivate{
	constructor(private accountService:AccountService,private router:Router){}
	canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		return of()
	}
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		if(this.accountService.isLoggedIn()){
			this.router.navigate([])
		}
		return !this.accountService.isLoggedIn()
	}
}