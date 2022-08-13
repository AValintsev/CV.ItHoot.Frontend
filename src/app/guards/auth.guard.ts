import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild, Route,
  Router,
  RouterStateSnapshot, UrlSegment,
  UrlTree
} from "@angular/router";
import {Injectable} from "@angular/core";
import {AccountService} from "../services/account.service";
import {Observable} from "rxjs";
import {UserRole} from "../models/users-type";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {


  constructor(private authService: AccountService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }


  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['']);
      return false;
    } else {
      return true;
    }
  }


}
