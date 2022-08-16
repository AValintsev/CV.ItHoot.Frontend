import {Router} from '@angular/router';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, finalize, switchMap, take} from 'rxjs/operators';
import {AccountService} from 'src/app/services/account.service';
import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {LoadingService} from '../services/loading.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  isRefreshing = false
  refreshTokenSubject = new BehaviorSubject<any>(null)
  private totalRequests = 0;
  constructor(
    private router:Router,
    private accountService: AccountService,
    private loadingService: LoadingService,
    ) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    this.totalRequests++;
    this.loadingService.setLoading(true)
    if (this.accountService.getJwtToken()) {
      req = this.addToken(req, this.accountService.getJwtToken() as string)

    }
    return next.handle(req)
      .pipe(
        catchError(error => {
          console.log('catchError',error)
          if (error instanceof HttpErrorResponse && error.status === 401) {
            return this.handle401Error(req, next)
          } else {
            this.loadingService.setLoading(false)
              return throwError(error)
          }
        }),
        finalize(() => {
          this.totalRequests--;
          if (this.totalRequests === 0) {
            this.loadingService.setLoading(false);
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
          // this.loadingService.setLoading(false)
          return next.handle(this.addToken(req, token.token))
        }),
      )
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap((jwt: any) => {
          // this.loadingService.setLoading(false)
          return next.handle(this.addToken(req, jwt))
        })
      )
    }
  }
}
