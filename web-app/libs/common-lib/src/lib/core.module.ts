import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelService } from './label/label.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpService, SnackBarService, StorageService } from './services';
import { provideHttpClient } from '@angular/common/http';

export function appLabelInitialize(appLabelService: LabelService) {
  return (): Promise<any> => {
    return appLabelService.loadLabels();
  };
}

@NgModule({
  imports: [CommonModule, MatSnackBarModule],
  providers: [
    LabelService,
    SnackBarService,
    HttpService,
    StorageService,
    { provide: APP_INITIALIZER, useFactory: appLabelInitialize, deps: [LabelService], multi: true },
    provideHttpClient()
  ],
  exports: [],
})
export class CoreModule {}
