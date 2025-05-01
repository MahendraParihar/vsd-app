import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { StorageService } from '../services';
import { NavigationPathEnum } from '../enums/navigation-path-enum';

@Injectable()
export class AuthGuardService {
  constructor(private storageService: StorageService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAuth();
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAuth();
  }

  private checkAuth(): boolean {
    if (this.storageService.getAccessToken()) {
      return true;
    } else {
      // Redirect to the login page if the user is not authenticated
      this.router.navigate([NavigationPathEnum.LOGIN], { replaceUrl: true });
      return false;
    }
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AuthGuardService).canActivate(next, state);
};

export const AuthGuardChild: CanActivateChildFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): boolean => {
  return inject(AuthGuardService).canActivateChild(next, state);
};
