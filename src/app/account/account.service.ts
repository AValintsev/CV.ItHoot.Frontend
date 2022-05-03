import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { catchError, map, mapTo, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserAuthData } from 'src/app/shared/models/userAuthData';
import { userLoginResponse } from '../shared/models/responses/userLoginResponse';

// const JWT_TOKEN = 'JWT_TOKEN'
// const REFRESH_TOKEN = 'REFRESH_TOKEN'
 
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private JWT_TOKEN = 'JWT_TOKEN'
  private REFRESH_TOKEN = 'REFRESH_TOKEN'
  baseUrl = environment.apiUrl;
  private userId$ = new BehaviorSubject<number>(-1)
  // private currentUserSource = new ReplaySubject<UserAuthData>(1);
  // currentUser$ = this.currentUserSource.asObservable();
  // currentUserEmail$ = "";

  constructor(private http: HttpClient, private router: Router) {}
  // get CurrentUser(){
  //     return this
  // }
   
  // loadCurrentUser() {
  //   return this.http.get<any>(this.baseUrl + "identity/getcurrentuserbytoken").pipe(
  //     map((user: UserAuthData) => {
  //       if (user) {
  //         localStorage.setItem('token', user.token);
  //         localStorage.setItem('refreshToken', user.refreshToken);
  //         localStorage.setItem('roles',user.roles[0])
  //         this.currentUserSource.next(user);
  //         console.log(user)
  //       }
  //     }))
  // }

  // login(values: any) {
  //   return this.http.post<UserAuthData>(this.baseUrl + "identity/login", values).pipe(
  //     tap(console.log),
  //     map((user: UserAuthData) => {
  //       if (user) {
  //         localStorage.setItem('token', user.token);
  //         localStorage.setItem('refreshToken', user.refreshToken);
  //         localStorage.setItem('roles',user.roles[0])
  //         this.currentUserSource.next(user);
  //         console.log(user)
  //       }
  //     })
  //   )
  // }

  register(values: any) {
    return this.http.post<UserAuthData>(this.baseUrl + 'identity/register', values).pipe(
      map((user: UserAuthData) => {
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('refreshToken',user.refreshToken)
          localStorage.setItem('roles',user.roles[0])
          // this.currentUserSource.next(user);
          console.log(user)

        }
      })
    )
  }

  // logout() {
  //   localStorage.removeItem('token');
  //   this.currentUserSource.next(undefined);
  //   this.router.navigateByUrl('/');
  // }

  checkEmailExists(email: string) {
    return this.http.get(this.baseUrl + 'identity/emailexists?email=' + email);
  }
  // ///////////////////////////////////////////////////////
  isLoggedIn():boolean{
     return true
  }
  login(user:{email:string,password:string}):Observable<boolean>{
    return this.http.post<boolean>(`${this.baseUrl}identity/login`, user)
    .pipe(
      tap<any>(tokens => this.doLoginUser(tokens)),
      mapTo(true),
      catchError(error=>{
        console.log(error)
        return of(error)
      })
    )
  }
  doLoginUser(tokens: userLoginResponse){
    this.setUserId(tokens.userId)
    this.storeTokens(tokens)
  }
  storeTokens(tokens: any){
    console.log(tokens)
    localStorage.setItem(this.JWT_TOKEN, tokens.token)
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken)
  }
  logout(): Observable<boolean> {

    return this.http.post(`${this.baseUrl}identity/logout`,{
      'refreshToken': this.getRefreshToken()
    })
    .pipe(
        tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error=>{
        console.log(error)
        return of(error)
      })
    )
  }
  setUserId(id:number){
    this.userId$.next(id)
  }
  getUserId(){
    return this.userId$
  }
  getRefreshToken(){
   return localStorage.getItem(this.REFRESH_TOKEN)
  }
  getJwtToken(){
   return localStorage.getItem(this.JWT_TOKEN)
  }
  doLogoutUser(){
    this.removeTokens()
  }
  removeTokens(){
    localStorage.removeItem(this.JWT_TOKEN)
    localStorage.removeItem(this.REFRESH_TOKEN)
  }
  refreshToken(){
    return this.http.post<boolean>(`${this.baseUrl}identity/refresh`, {
      
      "token": this.getJwtToken(),
      "refreshToken": this.getRefreshToken(),
      "forceRefresh": true
    })
    .pipe(
      tap((tokens:any)=>{
        console.log('ref-function',tokens.refreshToken)
        this.storeJwtToken(tokens)
      })
     
    )
  }
  storeJwtToken(tokens: any){
    console.log('storeJwtToken0', tokens)
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken)
    localStorage.setItem(this.JWT_TOKEN, tokens.token)   
  }

  geg(){
    return this.http.get(`${this.baseUrl}cv`)
  }
}
