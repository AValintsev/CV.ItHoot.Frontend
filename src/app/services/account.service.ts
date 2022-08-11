import {BehaviorSubject, Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, mapTo, tap} from 'rxjs/operators';
import {userResponse} from '../models/responses/userResponse';
import {environment} from "../../environments/environment";
import {UserAuthData} from "../models/userAuthData";
import jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private JWT_TOKEN = 'JWT_TOKEN'
  private REFRESH_TOKEN = 'REFRESH_TOKEN'
  private USER_ROLE = 'USER_ROLE'
  private USER_NAME = 'USER_NAME'
  private USER_ID = 'USER_ID'
  baseUrl = environment.apiUrl;
  private userId$ = new BehaviorSubject<number>(-1)
  private userRole$ = new BehaviorSubject<string>('')


  constructor(private http: HttpClient) {
  }


  checkEmailExists(email: string) {
    return this.http.get(this.baseUrl + 'identity/emailexists?email=' + email);
  }

  // ///////////////////////////////////////////////////////

  register(value: { email: string, password: string }): Observable<userResponse> {
    return this.http.post<userResponse>(this.baseUrl + 'identity/register', value)
      .pipe(
        tap(userData => this.doLoginUser(userData))
      )
  }

  isLoggedIn(): boolean {
    return !!this.getJwtToken()
  }

  login(user: { email: string, password: string }): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}identity/login`, user)
      .pipe(
        catchError(error => {
          return of(error)
        }),
        tap<any>(tokens =>{
          this.doLoginUser(tokens)
        }),
        mapTo(true),
      )
  }

  loginViaGoogle(token: string): Observable<boolean> {
    return this.http.post<UserAuthData>(`${this.baseUrl}identity/login/google`, {idToken: token}).pipe(
      catchError(error => {
        return of(error)
      }),
      tap<any>(tokens =>{
        this.doLoginUser(tokens)}),
      mapTo(true),
    )
  }



  loginByUrl(shortUrl: string): Observable<UserAuthData> {
    return this.http.post<UserAuthData>(`${this.baseUrl}identity/login/${shortUrl}`, null);
  }

  getStoreRole() {
    return (jwt_decode((localStorage.getItem(this.JWT_TOKEN)!))as any).role
  }

  getStoreName() {
    return (jwt_decode((localStorage.getItem(this.JWT_TOKEN)!))as any).given_name
  }

  doLoginUser(tokens: userResponse) {
    this.storeTokens(tokens)
  }

  storeTokens(tokens: any) {
    localStorage.setItem(this.JWT_TOKEN, tokens.token)
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken)
  }

  logout(): Observable<boolean> {
    return this.http.post(`${this.baseUrl}identity/logout`, {refreshToken: this.getRefreshToken()})
      .pipe(tap(() => {this.doLogoutUser()}),
        mapTo(true),
        catchError(error=> {
          return of(error)
        })
      )
  }

  setUserId(id: number) {
    this.userId$.next(id)
  }

  getUserId() {
   return (jwt_decode((localStorage.getItem(this.JWT_TOKEN)!))as any).nameId
  }

  getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN)
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN)
  }

  doLogoutUser() {
    localStorage.clear()
  }


  removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN)
    localStorage.removeItem(this.REFRESH_TOKEN)
  }

  refreshToken() {
    return this.http.post<boolean>(`${this.baseUrl}identity/refresh`, {
      "refreshToken": this.getRefreshToken(),
    })
      .pipe(
        tap((tokens: any) => {
          this.storeJwtToken(tokens)
        })
      )
  }

  storeJwtToken(tokens: any) {
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken)
    localStorage.setItem(this.JWT_TOKEN, tokens.token)
  }

}
