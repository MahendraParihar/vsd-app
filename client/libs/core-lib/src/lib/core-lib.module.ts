import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelService } from './label/label.service';
import { CreatedByUserPipe } from './pipes/created-by-user.pipe';
import { DateTimePipe } from './pipes/date-time.pipe';
import {
  AddressService, AuthService,
  ErrorHandlerService,
  FamilyService,
  HttpService,
  PostService,
  SnackBarService,
} from './services';
import { AuthGuardService } from './guard/auth.guard';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { LoaderInterceptor } from './guard/loader.interceptor';
import { HttpConfigInterceptor } from './guard/httpconfig.interceptor';

export function appLabelInitialize(appLabelService: LabelService) {
  return (): Promise<any> => {
    return appLabelService.loadLabels();
  };
}

@NgModule({
  declarations: [DateTimePipe, CreatedByUserPipe],
  imports: [CommonModule],
  providers: [
    HttpService,
    AuthGuardService,
    SnackBarService,
    ErrorHandlerService,
    LabelService,
    AddressService,
    PostService,
    AuthService,
    FamilyService,
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: appLabelInitialize,
      deps: [LabelService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  exports: [DateTimePipe, CreatedByUserPipe],
})
export class CoreLibModule {}
