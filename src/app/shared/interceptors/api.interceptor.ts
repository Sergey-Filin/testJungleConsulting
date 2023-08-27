import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from "@environments/environments";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const apiEndpoint = environments.baseUrl;
    const url = request.url;
    if (url.includes('api/')) {
      const resultUrl = `${apiEndpoint}/${url.replace('api/', '')}`;
      request = request.clone({
        url: resultUrl,
      });
    }
    return next.handle(request);
  }
}
