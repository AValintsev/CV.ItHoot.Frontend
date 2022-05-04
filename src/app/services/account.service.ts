import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { catchError, map, mapTo, tap } from 'rxjs/operators';
import { UserAuthData } from 'src/app/models/userAuthData';
import { userResponse } from '../models/responses/userResponse';
import {environment} from "../../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private JWT_TOKEN = 'JWT_TOKEN'
  private REFRESH_TOKEN = 'REFRESH_TOKEN'
  baseUrl = environment.apiUrl;
  private userId$ = new BehaviorSubject<number>(-1)
  private userRole$ = new BehaviorSubject<string>('')
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



  register(value:{email:string,password:string}):Observable<userResponse>{
  return this.http.post<userResponse>(this.baseUrl + 'identity/register', value)
  .pipe(
    tap(userData => this.doLoginUser(userData))
  )
}

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
  doLoginUser(tokens: userResponse){
    this.setUserRole(tokens.roles[0])
    this.setUserId(tokens.userId)
    this.storeTokens(tokens)
  }
  setUserRole(role:string){
    this.userRole$.next(role)
  }
  getUserRole(){
    return this.userRole$
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
      "refreshToken": this.getRefreshToken(),
    })
    .pipe(
      tap((tokens:any)=>{
        this.storeJwtToken(tokens)
      })

    )
  }
  storeJwtToken(tokens: any){
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken)
    localStorage.setItem(this.JWT_TOKEN, tokens.token)
  }

}
