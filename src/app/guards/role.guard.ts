import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from "@angular/router";
import {Injectable} from "@angular/core";
import {AccountService} from "../services/account.service";
import {Observable} from "rxjs";
import {UserRole} from "../models/users-type";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate,CanActivateChild {


  constructor(private authService: AccountService, private router: Router) { }

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
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }


  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.authService.isLoggedIn()) {
      const userRole = this.authService.getStoreRole();

      if(route.data.role == null){
        this.redirectToRolePage(userRole);
      }

      if (!this.checkRole(userRole,route.data.role)) {
        this.redirectToRolePage(userRole)
        return false;
      }
      return true;
    }

    this.router.navigate(['/account/login'])
    return false;
  }

  redirectToRolePage(role: UserRole){
    if(role == UserRole.HR || role == UserRole.Admin || role == UserRole.Sale) {
      this.router.navigate(['/admin'])
    } else if (role == UserRole.Client){
      this.router.navigate(['/client'])
    } else if (role == UserRole.User){
      this.router.navigate(['/home'])
    } else{
      this.authService.logout().subscribe(()=>{
        this.router.navigate(['/account/login'])
      });
    }
  }

   checkRole(role:any, roles:any) {
    return (roles.indexOf(role) > -1);
  }
}
