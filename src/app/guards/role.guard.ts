import { AccountService } from 'src/app/services/account.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Users } from '../models/users-type';



@Injectable({
	providedIn: 'root',
})
export class RoleGuard implements CanActivate {
	constructor(private router: Router, private accountService:AccountService) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		switch (this.accountService.getStoreRole()) {
			case Users[0]:
			case Users[1]:
				this.router.navigate(['/home/cv']);
				break;
			case Users[2]:
				this.router.navigate(['/home/cv/',this.accountService.getUserId()]);
				break;
			case Users[3]:
				this.router.navigate(['/home/cv/']);
				break;
		}
		return false;
	}
}
