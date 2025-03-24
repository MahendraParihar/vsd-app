import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { SharedService } from '../services';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private sharedService: SharedService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler):
    Observable<HttpEvent<unknown>> {
    this.sharedService.setLoader(true);
    return next.handle(request).pipe(
      finalize(() => this.sharedService.setLoader(false)),
    );
  }
}
