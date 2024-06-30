import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './services';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpConfigInterceptor } from './guard/httpconfig.interceptor';
import { AuthGuardService } from './guard/auth.guard';
import { LabelService } from './label/label.service';
import { DateTimePipe } from './pipes/date-time.pipe';
import { CreatedByUserPipe } from './pipes/created-by-user.pipe';
import { SnackBarService } from './services';
import { ErrorHandlerService } from './services';

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
    { provide: APP_INITIALIZER, useFactory: appLabelInitialize, deps: [LabelService], multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
  exports: [
    DateTimePipe,
    CreatedByUserPipe,
  ],
})
export class CoreLibModule {}
