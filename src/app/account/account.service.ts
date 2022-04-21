import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserAuthData } from 'src/app/shared/models/userAuthData';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<UserAuthData>(1);
  currentUser$ = this.currentUserSource.asObservable();
  currentUserEmail$ = "";

  constructor(private http: HttpClient, private router: Router) {}
  get CurrentUser(){
      return this
  }

  loadCurrentUser() {
    return this.http.get<any>(this.baseUrl + "identity/getcurrentuserbytoken").pipe(
      map((user: UserAuthData) => {
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('refreshToken', user.refreshToken);
          localStorage.setItem('roles',user.roles[0])
          this.currentUserSource.next(user);
          console.log(user)
        }
      }))
  }

  login(values: any) {
    return this.http.post<UserAuthData>(this.baseUrl + "identity/login", values).pipe(
      map((user: UserAuthData) => {
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('refreshToken', user.refreshToken);
          localStorage.setItem('roles',user.roles[0])
          this.currentUserSource.next(user);
          console.log(user)
        }
      })
    )
  }

  register(values: any) {
    return this.http.post<UserAuthData>(this.baseUrl + 'identity/register', values).pipe(
      map((user: UserAuthData) => {
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('refreshToken',user.refreshToken)
          localStorage.setItem('roles',user.roles[0])
          this.currentUserSource.next(user);
          console.log(user)

        }
      })
    )
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(undefined);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string) {
    return this.http.get(this.baseUrl + 'identity/emailexists?email=' + email);
  }
}
