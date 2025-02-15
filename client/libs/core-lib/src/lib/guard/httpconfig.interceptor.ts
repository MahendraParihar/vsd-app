import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { from, lastValueFrom, Observable, tap } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return from(this.handle(req, next));
  }

  async handle(request: HttpRequest<unknown>, next: HttpHandler) {
    const authToken = this.getToken();
    if (authToken) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${authToken}`),
      });
    }
    return await lastValueFrom(next.handle(request).pipe(
        tap((event) => {
          if (event instanceof HttpResponse) {
            event = event.clone({ body: this.modifyBody(event.body, event.status) });
          }
          return event;
        }),
      ),
    );
  }

  private modifyBody(body: any, status: any) {
    console.log('------------------------------------modifyBody');
    console.log(body);
    console.log(status);
    return body;
  }

  private getToken() {
    return this.storageService.getAuthToken();
  }
}
