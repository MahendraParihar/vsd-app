import { inject, NgModule, provideAppInitializer } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatedByUserPipe } from './pipes/created-by-user.pipe';
import { DateTimePipe } from './pipes/date-time.pipe';
import {
  AddressService,
  AuthService,
  ErrorHandlerService,
  FamilyService,
  HttpService,
  NavigationService,
  PostService,
  SnackBarService,
} from './services';
import { AuthGuardService } from './guard/auth.guard';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { LabelService } from './label/label.service';
import { HttpConfigInterceptor } from './guard/httpconfig.interceptor';
import { LoaderInterceptor } from './guard/loader.interceptor';

@NgModule({
  declarations: [DateTimePipe, CreatedByUserPipe],
  imports: [CommonModule],
  providers: [
    HttpService,
    AuthGuardService,
    SnackBarService,
    ErrorHandlerService,
    NavigationService,
    LabelService,
    AddressService,
    PostService,
    AuthService,
    FamilyService,
    provideHttpClient(),
    provideAppInitializer(async () => {
      const appLabelService = inject(LabelService);
      return await appLabelService.loadLabels();
    }),
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
