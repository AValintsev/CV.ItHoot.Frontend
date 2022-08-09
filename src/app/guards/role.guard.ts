import {AccountService} from 'src/app/services/account.service';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Users} from '../models/users-type';


@Injectable({
	providedIn: 'root',
})
export class RoleGuard implements CanActivate {
	constructor(private router: Router, private accountService:AccountService) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		if (this.accountService.getStoreRole() === Users[0] || this.accountService.getStoreRole() === Users[1]|| this.accountService.getStoreRole() === Users[4]){
			this.router.navigate(['/admin']);
			return true
		} else if (this.accountService.getStoreRole() === Users[2]){
			this.router.navigate(['/home/cv/user-list']);
			return true
		} else if (this.accountService.getStoreRole() === Users[3]){
			this.router.navigate(['/client/proposals/']);
			return true
		}else{
			this.router.navigate(['/account/']);
			return false
		}
	}
}
