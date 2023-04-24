import {Component} from '@angular/core';
import {StorageService} from "./service/storage.service";
import {SharedService} from "./service/shared.service";
import {NavigationService} from "./service/navigation.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private storageService: StorageService,
              private sharedService: SharedService,
              private navigationService: NavigationService) {
    const authUser = this.storageService.getAuthUser();
    if (authUser) {
      console.log('Init Auth User');
      this.sharedService.setLoginUser(authUser);
    } else {
      this.navigationService.navigateToLogin();
    }
  }
}
