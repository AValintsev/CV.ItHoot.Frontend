import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {UserAuthData} from "../app/shared/models/userAuthData";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject!: BehaviorSubject<UserAuthData>
  private user!: Observable<UserAuthData>

  constructor(
      private http : HttpClient,
      private router : Router,

  ) {
    this.userSubject = new BehaviorSubject<UserAuthData>(JSON.parse(localStorage.getItem('user') as string))
    this.user = this.userSubject.asObservable()
  }
  public UserValue(): UserAuthData{
    return this.userSubject.value
  }
  public UserValue2(): Observable<UserAuthData>{
    return this.userSubject.asObservable()
  }

  // login(form :object) {
  //   return this.http.post<any>('https://localhost:5001/api/v1/identity/login', form)
  //     .pipe(map((x:UserAuthData) =>{
  //       localStorage.setItem('user',JSON.stringify(x));
  //       this.userSubject.next(x);
  //       this.router.navigateByUrl('/cv/list');
  //       return x
  //     }))
  // }

  logOut(){
    this.router.navigateByUrl('/')
    localStorage.removeItem('user')
    this.userSubject.next(new class implements UserAuthData {
      displayName!: string;
      refreshToken!: string;
      roles!: [string];
      token!: string;
      userEmail!: string;
      userId!: number;
    })
  }

}
