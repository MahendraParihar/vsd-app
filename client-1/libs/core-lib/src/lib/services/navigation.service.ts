import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { SharedService } from './shared.service';
import { Location } from '@angular/common';
import { NavigationPathEnum } from '../enums/navigation-path-enum';
import { BreadcrumbItem } from '../interfaces/breadcrumb-item';
import { LabelService } from '../label/label.service';
import { LabelKey } from '@vsd-common/lib';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private currentUrl = new BehaviorSubject<string>('');

  constructor(
    private router: Router,
    private storageService: StorageService,
    private location: Location,
    private sharedService: SharedService,
    private labelService: LabelService,
  ) {
  }

  back(): void {
    // this.router.navigate("..");
    this.location.back();
  }

  public getCurrentUrl(): BehaviorSubject<string> {
    if (!this.currentUrl.value) {
      // handles redirect after login
      const url = this.router.url;
      this.currentUrl.next(url);
    }

    return this.currentUrl;
  }

  navigateTo(navEnum: NavigationPathEnum) {
    this.setBreadcrumb(navEnum);
  }

  navigateToLogin() {
    this.router
      .navigate([NavigationPathEnum.LOGIN], { replaceUrl: true })
      .then((suc: any) => {
        console.log('Success', suc);
      })
      .catch((e: any) => {
        console.log(e);
      });
  }

  navigateToHome() {
    this.router
      .navigate([NavigationPathEnum.HOME], { replaceUrl: true })
      .then((suc: any) => {
        console.log('Success', suc);
        this.setBreadcrumb(NavigationPathEnum.HOME);
      })
      .catch((e: any) => {
        console.log(e);
      });
  }

  navigateToById(navEnum: NavigationPathEnum, navId: any) {
    const tempUrl = `${navEnum}/${navId}`;
    this.router
      .navigateByUrl(tempUrl)
      .then((suc: any) => {
        this.setBreadcrumb(navEnum, navId);
      })
      .catch((e: any) => {
        console.log(e);
      });
  }

  navigateToByOptionalId(navEnum: NavigationPathEnum, navId: any) {
    const tempUrl = `${navEnum}/${navId}`;
    this.router
      .navigate([navEnum, { id: navId }])
      .then((suc: any) => {
        this.setBreadcrumb(navEnum, navId);
      })
      .catch((e: any) => {
        console.log(e);
      });
  }

  signOut() {
    this.router
      .navigateByUrl(NavigationPathEnum.LOGIN, { replaceUrl: true })
      .then((suc: any) => {
        this.storageService.clearAuthUser();
      })
      .catch((e: any) => {
        console.log(e);
      });
  }

  isNumeric(value: string): boolean {
    return /^-?\d+$/.test(value);
  }

  setBreadcrumb(path: NavigationPathEnum, id: any = 0) {
    let temp = path.split('/');
    if (temp && temp.length > 0) {
      if (temp[0] === '') {
        temp = temp.splice(0, 1);
      }
    }
    if (temp && temp.length > 0) {
      if (this.isNumeric(temp[temp.length - 1])) {
        id = Number(temp[temp.length - 1]);
        temp.pop();
        path = <NavigationPathEnum>temp.join('/');
      } else if (this.isNumeric(temp[temp.length - 2])) {
        id = Number(temp[temp.length - 2]);
        path = NavigationPathEnum.FAMILY;
      } else {
        path = <NavigationPathEnum>temp.join('/');
      }
    }
    const breadcrumbList: BreadcrumbItem[] = [];
    breadcrumbList.push({
      title: this.labelService.getLabel(LabelKey.SIDE_MENU_HOME),
      path: NavigationPathEnum.HOME,
    });
    if (path)
      switch (path) {
        case NavigationPathEnum.ADMIN_USERS:
          breadcrumbList.push({
            title: 'Admin List',
            path: NavigationPathEnum.ADMIN_USERS,
          });
          break;
        case NavigationPathEnum.ADMIN_MANAGE:
          breadcrumbList.push({
            title: 'Admin List',
            path: NavigationPathEnum.ADMIN_USERS,
          });
          breadcrumbList.push({
            title: id > 0 ? 'Admin Edit' : 'Admin Create',
            path: NavigationPathEnum.ADMIN_MANAGE,
          });
          break;
        case NavigationPathEnum.ADMIN_CHANGE_PASSWORD:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.ACTION_CHANGE_PASSWORD),
            path: NavigationPathEnum.ADMIN_CHANGE_PASSWORD,
          });
          break;
        case NavigationPathEnum.ADMIN_EDIT_PROFILE:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.ACTION_EDIT),
            path: NavigationPathEnum.ADMIN_EDIT_PROFILE,
          });
          break;
        case NavigationPathEnum.EVENT:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_EVENT),
            path: NavigationPathEnum.EVENT,
          });
          break;
        case NavigationPathEnum.FAMILY:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_FAMILY),
            path: NavigationPathEnum.FAMILY,
          });
          break;
        case NavigationPathEnum.FAMILY_MANAGE:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_FAMILY),
            path: NavigationPathEnum.FAMILY,
          });
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_FAMILY),
            path: NavigationPathEnum.FAMILY_MANAGE,
          });
          break;
        case NavigationPathEnum.NEWS:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_NEWS),
            path: NavigationPathEnum.NEWS,
          });
          break;
        case NavigationPathEnum.NEWS_MANAGE:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_NEWS),
            path: NavigationPathEnum.NEWS,
          });
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_NEWS),
            path: NavigationPathEnum.NEWS_MANAGE,
          });
          break;
        case NavigationPathEnum.TEMPLE:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_TEMPLE),
            path: NavigationPathEnum.TEMPLE,
          });
          break;
        case NavigationPathEnum.TEMPLE_MANAGE:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_TEMPLE),
            path: NavigationPathEnum.TEMPLE,
          });
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_TEMPLE),
            path: NavigationPathEnum.TEMPLE_MANAGE,
          });
          break;
        case NavigationPathEnum.MANDAL:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_MANDAL),
            path: NavigationPathEnum.MANDAL,
          });
          break;
        case NavigationPathEnum.MANDAL_MANAGE:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_MANDAL),
            path: NavigationPathEnum.MANDAL,
          });
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_MANDAL),
            path: NavigationPathEnum.MANDAL_MANAGE,
          });
          break;
        case NavigationPathEnum.SETTING:
          breadcrumbList.push({
            title: 'Setting',
            path: NavigationPathEnum.SETTING,
          });
          break;
        case NavigationPathEnum.JOB_CATEGORY:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_JOB_CATEGORY),
            path: NavigationPathEnum.JOB_CATEGORY,
          });
          break;
        case NavigationPathEnum.JOB_CATEGORY_MANAGE:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_JOB_CATEGORY),
            path: NavigationPathEnum.JOB_CATEGORY,
          });
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_JOB_CATEGORY),
            path: NavigationPathEnum.JOB_CATEGORY_MANAGE,
          });
          break;
        case NavigationPathEnum.JOB_SUB_CATEGORY:
          breadcrumbList.push({
            title: this.labelService.getLabel(
              LabelKey.SIDE_MENU_JOB_SUB_CATEGORY,
            ),
            path: NavigationPathEnum.JOB_SUB_CATEGORY,
          });
          break;
        case NavigationPathEnum.JOB_SUB_CATEGORY_MANAGE:
          breadcrumbList.push({
            title: this.labelService.getLabel(
              LabelKey.SIDE_MENU_JOB_SUB_CATEGORY,
            ),
            path: NavigationPathEnum.JOB_SUB_CATEGORY,
          });
          breadcrumbList.push({
            title: this.labelService.getLabel(
              LabelKey.SIDE_MENU_JOB_SUB_CATEGORY,
            ),
            path: NavigationPathEnum.JOB_SUB_CATEGORY_MANAGE,
          });
          break;
        case NavigationPathEnum.JOB_TYPE:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_JOB_TYPE),
            path: NavigationPathEnum.JOB_TYPE,
          });
          break;
        case NavigationPathEnum.JOB_TYPE_MANAGE:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_JOB_TYPE),
            path: NavigationPathEnum.JOB_TYPE,
          });
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_JOB_TYPE),
            path: NavigationPathEnum.JOB_TYPE_MANAGE,
          });
          break;
        case NavigationPathEnum.JOB_STATUS:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_JOB_STATUS),
            path: NavigationPathEnum.JOB_STATUS,
          });
          break;
        case NavigationPathEnum.JOB_STATUS_MANAGE:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_JOB_STATUS),
            path: NavigationPathEnum.JOB_STATUS,
          });
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_JOB_STATUS),
            path: NavigationPathEnum.JOB_STATUS_MANAGE,
          });
          break;
        case NavigationPathEnum.FAQ_CATEGORY:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_FAQ_CATEGORY),
            path: NavigationPathEnum.FAQ_CATEGORY,
          });
          break;
        case NavigationPathEnum.FAQ_CATEGORY_MANAGE:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_FAQ_CATEGORY),
            path: NavigationPathEnum.FAQ_CATEGORY,
          });
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_FAQ_CATEGORY),
            path: NavigationPathEnum.FAQ_CATEGORY_MANAGE,
          });
          break;
        case NavigationPathEnum.BUSINESS:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_BUSINESS),
            path: NavigationPathEnum.BUSINESS,
          });
          break;
        case NavigationPathEnum.BUSINESS_MANAGE:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_BUSINESS),
            path: NavigationPathEnum.BUSINESS,
          });
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_BUSINESS),
            path: NavigationPathEnum.BUSINESS_MANAGE,
          });
          break;
        case NavigationPathEnum.SERVICE:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_SERVICE),
            path: NavigationPathEnum.SERVICE,
          });
          break;
        case NavigationPathEnum.SERVICE_MANAGE:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_SERVICE),
            path: NavigationPathEnum.SERVICE,
          });
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_SERVICE),
            path: NavigationPathEnum.SERVICE_MANAGE,
          });
          break;
        case NavigationPathEnum.CITY_VILLAGE:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_CITY_VILLAGE),
            path: NavigationPathEnum.CITY_VILLAGE,
          });
          break;
        case NavigationPathEnum.CITY_VILLAGE_MANAGE:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_CITY_VILLAGE),
            path: NavigationPathEnum.CITY_VILLAGE,
          });
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_CITY_VILLAGE),
            path: NavigationPathEnum.CITY_VILLAGE_MANAGE,
          });
          break;
        case NavigationPathEnum.STATE:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_STATE),
            path: NavigationPathEnum.STATE,
          });
          break;
        case NavigationPathEnum.STATE_MANAGE:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_STATE),
            path: NavigationPathEnum.STATE,
          });
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_STATE),
            path: NavigationPathEnum.STATE_MANAGE,
          });
          break;
        case NavigationPathEnum.DISTRICT:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_DISTRICT),
            path: NavigationPathEnum.DISTRICT,
          });
          break;
        case NavigationPathEnum.DISTRICT_MANAGE:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_DISTRICT),
            path: NavigationPathEnum.DISTRICT,
          });
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_DISTRICT),
            path: NavigationPathEnum.DISTRICT_MANAGE,
          });
          break;
        case NavigationPathEnum.COUNTRY:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_COUNTRY),
            path: NavigationPathEnum.COUNTRY,
          });
          break;
        case NavigationPathEnum.COUNTRY_MANAGE:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_COUNTRY),
            path: NavigationPathEnum.COUNTRY,
          });
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_COUNTRY),
            path: NavigationPathEnum.COUNTRY_MANAGE,
          });
          break;
        case NavigationPathEnum.ADDICTION:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_ADDICTION),
            path: NavigationPathEnum.ADDICTION,
          });
          break;
        case NavigationPathEnum.ADDICTION_MANAGE:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_ADDICTION),
            path: NavigationPathEnum.ADDICTION,
          });
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_ADDICTION),
            path: NavigationPathEnum.ADDICTION_MANAGE,
          });
          break;
        case NavigationPathEnum.EDUCATION_DEGREE:
          breadcrumbList.push({
            title: this.labelService.getLabel(
              LabelKey.SIDE_MENU_EDUCATION_DEGREE,
            ),
            path: NavigationPathEnum.EDUCATION_DEGREE,
          });
          break;
        case NavigationPathEnum.EDUCATION_DEGREE_MANAGE:
          breadcrumbList.push({
            title: this.labelService.getLabel(
              LabelKey.SIDE_MENU_EDUCATION_DEGREE,
            ),
            path: NavigationPathEnum.EDUCATION_DEGREE,
          });
          breadcrumbList.push({
            title: this.labelService.getLabel(
              LabelKey.SIDE_MENU_EDUCATION_DEGREE,
            ),
            path: NavigationPathEnum.EDUCATION_DEGREE_MANAGE,
          });
          break;
        case NavigationPathEnum.GENDER:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_GENDER),
            path: NavigationPathEnum.GENDER,
          });
          break;
        case NavigationPathEnum.GENDER_MANAGE:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_GENDER),
            path: NavigationPathEnum.GENDER,
          });
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_GENDER),
            path: NavigationPathEnum.GENDER_MANAGE,
          });
          break;
        case NavigationPathEnum.MARITAL_STATUS:
          breadcrumbList.push({
            title: this.labelService.getLabel(
              LabelKey.SIDE_MENU_MARITAL_STATUS,
            ),
            path: NavigationPathEnum.MARITAL_STATUS,
          });
          break;
        case NavigationPathEnum.MARITAL_STATUS_MANAGE:
          breadcrumbList.push({
            title: this.labelService.getLabel(
              LabelKey.SIDE_MENU_MARITAL_STATUS,
            ),
            path: NavigationPathEnum.MARITAL_STATUS,
          });
          breadcrumbList.push({
            title: this.labelService.getLabel(
              LabelKey.SIDE_MENU_MARITAL_STATUS,
            ),
            path: NavigationPathEnum.MARITAL_STATUS_MANAGE,
          });
          break;
        case NavigationPathEnum.MATRIMONIAL_STATUS:
          breadcrumbList.push({
            title: this.labelService.getLabel(
              LabelKey.SIDE_MENU_MATRIMONIAL_STATUS,
            ),
            path: NavigationPathEnum.MATRIMONIAL_STATUS,
          });
          break;
        case NavigationPathEnum.MATRIMONIAL_STATUS_MANAGE:
          breadcrumbList.push({
            title: this.labelService.getLabel(
              LabelKey.SIDE_MENU_MATRIMONIAL_STATUS,
            ),
            path: NavigationPathEnum.MATRIMONIAL_STATUS,
          });
          breadcrumbList.push({
            title: this.labelService.getLabel(
              LabelKey.SIDE_MENU_MATRIMONIAL_STATUS,
            ),
            path: NavigationPathEnum.MATRIMONIAL_STATUS_MANAGE,
          });
          break;
        case NavigationPathEnum.MATRIMONIAL_REQUESTED_STATUS:
          breadcrumbList.push({
            title: this.labelService.getLabel(
              LabelKey.SIDE_MENU_MATRIMONIAL_REQUESTED_STATUS,
            ),
            path: NavigationPathEnum.MATRIMONIAL_REQUESTED_STATUS,
          });
          break;
        case NavigationPathEnum.MATRIMONIAL_REQUESTED_STATUS_MANAGE:
          breadcrumbList.push({
            title: this.labelService.getLabel(
              LabelKey.SIDE_MENU_MATRIMONIAL_REQUESTED_STATUS,
            ),
            path: NavigationPathEnum.MATRIMONIAL_REQUESTED_STATUS,
          });
          breadcrumbList.push({
            title: this.labelService.getLabel(
              LabelKey.SIDE_MENU_MATRIMONIAL_REQUESTED_STATUS,
            ),
            path: NavigationPathEnum.MATRIMONIAL_REQUESTED_STATUS_MANAGE,
          });
          break;
        case NavigationPathEnum.RAASI:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_RAASI),
            path: NavigationPathEnum.RAASI,
          });
          break;
        case NavigationPathEnum.RAASI_MANAGE:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_RAASI),
            path: NavigationPathEnum.RAASI,
          });
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_RAASI),
            path: NavigationPathEnum.RAASI_MANAGE,
          });
          break;
        case NavigationPathEnum.POST:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_POST),
            path: NavigationPathEnum.POST,
          });
          break;
        case NavigationPathEnum.POST_MANAGE:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_POST),
            path: NavigationPathEnum.POST,
          });
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_POST),
            path: NavigationPathEnum.POST_MANAGE,
          });
          break;
        case NavigationPathEnum.ADDRESS_TYPE:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_ADDRESS_TYPE),
            path: NavigationPathEnum.ADDRESS_TYPE,
          });
          break;
        case NavigationPathEnum.ADDRESS_TYPE_MANAGE:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_ADDRESS_TYPE),
            path: NavigationPathEnum.ADDRESS_TYPE,
          });
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_ADDRESS_TYPE),
            path: NavigationPathEnum.ADDRESS_TYPE_MANAGE,
          });
          break;
        case NavigationPathEnum.CONTACT_TYPE:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_CONTACT_TYPE),
            path: NavigationPathEnum.CONTACT_TYPE,
          });
          break;
        case NavigationPathEnum.CONTACT_TYPE_MANAGE:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_CONTACT_TYPE),
            path: NavigationPathEnum.CONTACT_TYPE,
          });
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_CONTACT_TYPE),
            path: NavigationPathEnum.CONTACT_TYPE_MANAGE,
          });
          break;
        case NavigationPathEnum.FACILITY:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_FACILITY),
            path: NavigationPathEnum.FAMILY,
          });
          break;
        case NavigationPathEnum.INQUIRY:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_INQUIRY),
            path: NavigationPathEnum.INQUIRY,
          });
          break;
        case NavigationPathEnum.FACILITY_MANAGE:
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_FACILITY),
            path: NavigationPathEnum.FACILITY,
          });
          breadcrumbList.push({
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_FACILITY),
            path: NavigationPathEnum.FACILITY_MANAGE,
          });
          break;
      }
    this.sharedService.setBreadcrumb(breadcrumbList);
  }
}
