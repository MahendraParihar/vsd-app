import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { NavigationService, StorageService } from '../services';

@Injectable()
export class AuthGuardService {
  constructor(private storageService: StorageService,
              private navigationService: NavigationService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAuth();
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAuth();
  }

  private checkAuth(): boolean {
    if (this.storageService.getAuthToken()) {
      return true;
    } else {
      // Redirect to the login page if the user is not authenticated
      this.navigationService.navigateToLogin();
      return false;
    }
  }
}

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): boolean => {
  return inject(AuthGuardService).canActivate(next, state);
};

export const AuthGuardChild: CanActivateChildFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): boolean => {
  return inject(AuthGuardService).canActivateChild(next, state);
};
