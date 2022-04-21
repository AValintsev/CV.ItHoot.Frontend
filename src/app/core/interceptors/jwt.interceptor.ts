import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../../../authServeces/auth-service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.authService.UserValue()!=null) {
        req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.UserValue().token}`
        }
      })
    }

    return next.handle(req);
  }
}
