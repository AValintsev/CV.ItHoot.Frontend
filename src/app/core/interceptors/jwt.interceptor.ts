import { BehaviorSubject } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaderResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, Subject, throwError } from 'rxjs';
import { AuthService } from "../../../authServeces/auth-service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  isRefreshing = false
  refreshTokenSubject = new BehaviorSubject<any>(null)
  constructor(private accountService: AccountService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    if (this.accountService.getJwtToken()) {
      req = this.addToken(req, this.accountService.getJwtToken() as string)

    }
    return next.handle(req)
      .pipe(
        catchError(error => {
          console.log('catchError')
          if (error instanceof HttpErrorResponse && error.status === 401) {
            console.log('error instanceof HttpHeaderResponse');
            return this.handle401Error(req, next)
          } else {
            console.log(' return throwError(error)')
            return throwError(error)
          }
        })
      )
  }
  addToken(req: HttpRequest<any>, jwtToken: string) {
    return req.clone({
      setHeaders: {
        'Authorization': `Bearer ${jwtToken}`
      }
    })
  }
  private handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.accountService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.token)
          return next.handle(this.addToken(req, token.token))
        }),
      )
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap((jwt: any) => {
          return next.handle(this.addToken(req, jwt))
        })
      )
    }
  }
}