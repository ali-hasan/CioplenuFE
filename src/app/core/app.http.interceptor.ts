import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { LoaderService } from './loader.service';



@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  private requests: HttpRequest<any>[] = [];

  constructor (
    private authService: AuthService,
    private loaderService: LoaderService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(request);
    this.loaderService.isLoading.next(true);
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${environment.api.apiKey}`
      },
      url: `${environment.api.rooturl}/${request.url}`
    });

    return next.handle(authRequest)
    .pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // console.log(' all good :)');
          this.removeRequest(request);
          return event;
        }
        return event;
      }, error => {
       // http response status code
        if (error instanceof HttpErrorResponse) {
          if (error.status > 400 && error.status < 500) {
            console.error('Error status code:', error);
          }
          this.removeRequest(request);
        }
      })
    );
  }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0);
  }
}
