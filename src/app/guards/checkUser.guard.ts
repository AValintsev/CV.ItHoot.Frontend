import {Injectable} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {AccountService} from 'src/app/services/account.service';
import {Users} from '../models/users-type';
import {ResumeService} from '../services/resume.service';

@Injectable({
	providedIn: 'root'
})

export class CheckUserGuard implements CanLoad, CanActivate {
	constructor(private accountService: AccountService, private activatedRoute:ActivatedRoute, private router: Router, private resumeService: ResumeService) { }
	canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		if (this.accountService.getStoreRole() === Users[2]) {
			// return this.router.navigate(['account/login'])
			return true
		}
		return true
	}
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		// if (this.accountService.getStoreRole() === Users[2]) {
		// 	if(route.params['id'] === this.accountService.getUserId()){
		// 		return true
		// 	}else{
		// 		return this.router.navigate(['/home/cv/', this.accountService.getUserId()])
		// 	}

		// }

		// return this.router.navigate(['/home/cv/', route.params['id']]);

return true

		// switch (this.accountService.getStoreRole()) {
		// 	case Users[0]:
		// 	case Users[1]:
		// 		this.router.navigate(['/home/cv', route.params['id']]);
		// 		break;
		// 	case Users[2]:
		// 		if (route.params['id'] === this.accountService.getUserId()) {
		// 			return true
		// 		} else {
		// 			return this.router.navigate(['/home/cv/', this.accountService.getUserId()])
		// 		}

		// 	case Users[3]:
		// 		this.router.navigate(['/home/cv/', route.params['id']]);
		// 		break;
		// }
		// return true
	}
}
