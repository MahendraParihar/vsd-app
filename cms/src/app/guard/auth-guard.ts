import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {StorageService} from '../service/storage.service';
import {NavigationService} from "../service/navigation.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private storageService: StorageService,
              private navigationService: NavigationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.storageService.getAuthUser() != null;
  }
}
