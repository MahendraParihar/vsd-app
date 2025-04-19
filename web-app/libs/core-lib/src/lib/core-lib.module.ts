import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelService } from './label/label.service';
import { provideHttpClient } from '@angular/common/http';
import { BannerService, HttpService, StorageService } from './services';

export function appLabelInitialize(appLabelService: LabelService) {
  return (): Promise<any> => {
    return appLabelService.loadLabels();
  };
}

@NgModule({
  imports: [CommonModule],
  providers: [
    LabelService,
    HttpService,
    StorageService,
    BannerService,
    { provide: APP_INITIALIZER, useFactory: appLabelInitialize, deps: [LabelService], multi: true },
    provideHttpClient(),
  ],
})
export class CoreLibModule {}
