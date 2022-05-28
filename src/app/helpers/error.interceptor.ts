import {SnackBarService} from "../services/snack-bar.service";
import {AppInjector} from "../app.module";
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    return next.handle(req)
      .pipe(
        catchError(error => {
          if(error.status === 0){
            const service:SnackBarService = AppInjector.get(SnackBarService);
            service.showDanger('Backend offline')
            return throwError(error)
          }
          else {
            const service:SnackBarService = AppInjector.get(SnackBarService);
            service.showDanger('Something went wrong')
            return throwError(error)
          }
        })
      )
  }
}
