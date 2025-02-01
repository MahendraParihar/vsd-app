import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AddressService,
  ErrorHandlerService,
  FamilyService,
  HttpService,
  PostService,
  SnackBarService,
} from './services';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpConfigInterceptor } from './guard/httpconfig.interceptor';
import { AuthGuardService } from './guard/auth.guard';
import { LabelService } from './label/label.service';
import { DateTimePipe } from './pipes/date-time.pipe';
import { CreatedByUserPipe } from './pipes/created-by-user.pipe';
import { LoaderInterceptor } from './guard/loader.interceptor';

export function appLabelInitialize(appLabelService: LabelService) {
  return (): Promise<any> => {
    return appLabelService.loadLabels();
  };
}

@NgModule({
  declarations: [
    DateTimePipe,
    CreatedByUserPipe,
  ],
  imports: [CommonModule, HttpClientModule],
  providers: [
    HttpService,
    AuthGuardService,
    SnackBarService,
    ErrorHandlerService,
    LabelService,
    AddressService,
    PostService,
    FamilyService,
    { provide: APP_INITIALIZER, useFactory: appLabelInitialize, deps: [LabelService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  exports: [
    DateTimePipe,
    CreatedByUserPipe,
  ],
})
export class CoreLibModule {}
