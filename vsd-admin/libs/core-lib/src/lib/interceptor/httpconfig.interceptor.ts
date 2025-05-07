import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService, private authService: AuthService, private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.storageService.getAccessToken();
    let authReq = req;

    if (token) {
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Try refresh token
          return from(this.authService.refreshToken()).pipe(
            switchMap((data) => {
              this.storageService.setAccessToken(data);
              const cloned = req.clone({
                setHeaders: { Authorization: `Bearer ${data}` },
              });
              return next.handle(cloned);
            }),
          );
        }
        return throwError(() => error);
      }),
    );
  }
}
