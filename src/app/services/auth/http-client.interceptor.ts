import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {

  constructor(private localStorageService: LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

   // Get the token
    const token = this.localStorageService.retrieve('authenticationToken');

    /**
     * If the token exist,
     * Clone it inside Authorization header : Bearer(space)token
     * As done in Postman manually
     */
    if (token) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      // Continue the request
      return next.handle(cloned);
    } else {
      /**
       * Else, if the token is not valid or doesn't exist,
       * Forward simply the request as it is : so without storing it in the Authorization header
       */
      return next.handle(request);
    }
  }
}
