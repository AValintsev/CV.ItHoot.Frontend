import {Router} from '@angular/router';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {AccountService} from 'src/app/services/account.service';
import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  isRefreshing = false
  refreshTokenSubject = new BehaviorSubject<any>(null)
  constructor(
    private router:Router,
    private accountService: AccountService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    if (this.accountService.getJwtToken()) {
      req = this.addToken(req, this.accountService.getJwtToken() as string)

    }
    return next.handle(req)
      .pipe(
        catchError(error => {
          console.log('catchError')
          if (error instanceof HttpErrorResponse && error.status === 401) {
            return this.handle401Error(req, next)
          } else {
            // if (error instanceof HttpErrorResponse && error.status === 400 && this.accountService.getUserRole().value === 'User'){
            //   if (this.accountService.getUserRole().value === 'User') {
            //     this.router.navigate([`/home/cv/create`])
            //   }
            // }
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
