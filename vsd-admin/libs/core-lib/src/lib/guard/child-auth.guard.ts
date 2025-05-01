import { ActivatedRouteSnapshot, CanActivateChildFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';

export class ChildAuthGuardService {
  constructor(private storageService: StorageService) {}

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.storageService.getAccessToken()) {
      return true;
    }
    return false;
  }
}

export const ChildAuthGuard: CanActivateChildFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): boolean => {
  return inject(ChildAuthGuardService).canActivateChild(next, state);
};
