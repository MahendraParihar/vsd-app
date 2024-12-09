import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) {
  }

  public showWarning(message: string): void {
    this.openSnackBar(message, 'snackbar-warning');
  }

  public showError(message: string, showAction = true, actionText = 'Ok'): void {
    this.openSnackBar(message, 'snackbar-error', 'bottom', 'center', 5000, showAction, actionText);
  }

  public showSuccess(message: string): void {
    this.openSnackBar(message, 'snackbar-success');
  }

  private openSnackBar(message: string,
                       color = '',
                       vPosition: MatSnackBarVerticalPosition = 'bottom',
                       hPosition: MatSnackBarHorizontalPosition = 'center',
                       durationIn = 5000,
                       showAction = false,
                       actionText = ''): void {
    if (message) {
      if (showAction) {
        this.snackBar.open(message, actionText ? actionText : 'Ok', {
          panelClass: [color ? color : ''],
          horizontalPosition: hPosition,
          verticalPosition: vPosition,
        });
      } else {
        this.snackBar.open(message, '', {
          duration: durationIn,
          panelClass: [color ? color : ''],
          horizontalPosition: hPosition,
          verticalPosition: vPosition,
        });
      }
    }
  }
}
