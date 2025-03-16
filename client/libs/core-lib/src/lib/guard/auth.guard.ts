import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { AuthService, NavigationService, StorageService, UserService } from '../services';

@Injectable()
export class AuthGuardService {
  constructor(private storageService: StorageService,
              private authService: AuthService,
              private userService: UserService,
              private navigationService: NavigationService) {
  }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.checkAuth();
  }

  async canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.checkAuth();
  }

  private async checkAuth(): Promise<boolean> {
    if (this.storageService.getAuthToken()) {
      const profile = await this.authService.getUserProfile();
      this.userService.login(profile);
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
