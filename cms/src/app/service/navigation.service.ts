import {Injectable} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';
import {NavigationPathEnum} from '../enum/navigation-path-enum';
import {BehaviorSubject} from 'rxjs';
import {StorageService} from "./storage.service";
import {Location} from '@angular/common'
import {SharedService} from "./shared.service";
import {BreadcrumbItem} from "../interfaces/breadcrumb-item";
import {StringResources} from "../enum/string-resources";
import {isNaN} from "lodash";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private currentUrl = new BehaviorSubject<string>('');

  constructor(private router: Router,
              private storageService: StorageService,
              private location: Location,
              private sharedService: SharedService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  back(): void {
    // this.router.navigate("..");
    this.location.back()
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
    this.router.navigate([navEnum]).then((suc: any) => {
      this.setBreadcrumb(navEnum);
    }).catch((e: any) => {
      console.log(e)
    });
  }

  navigateToLogin() {
    this.router.navigate([NavigationPathEnum.LOGIN], {replaceUrl: true})
      .then((suc: any) => {
      }).catch((e: any) => {
      console.log(e)
    })
  }

  navigateToHome() {
    this.router.navigate([NavigationPathEnum.HOME], {replaceUrl: true})
      .then((suc: any) => {
        this.setBreadcrumb(NavigationPathEnum.HOME);
      }).catch((e: any) => {
      console.log(e)
    })
  }

  navigateToById(navEnum: NavigationPathEnum, navId: any) {
    const tempUrl = `${navEnum}/${navId}`;
    this.router.navigateByUrl(tempUrl).then((suc: any) => {
      this.setBreadcrumb(navEnum, navId);
    }).catch((e: any) => {
      console.log(e)
    });
  }

  navigateToByOptionalId(navEnum: NavigationPathEnum, navId: any) {
    const tempUrl = `${navEnum}/${navId}`;
    this.router.navigate([navEnum, {id: navId}]).then((suc: any) => {
      this.setBreadcrumb(navEnum, navId);
    }).catch((e: any) => {
      console.log(e)
    });
  }

  signOut() {
    this.storageService.clearAuthUser();
    this.router.navigate([NavigationPathEnum.LOGIN], {replaceUrl: true})
      .then((suc: any) => {
      }).catch((e: any) => {
      console.log(e)
    })
  }

  isNumeric(value:string):boolean {
    return /^-?\d+$/.test(value);
  }

  setBreadcrumb(path: NavigationPathEnum, id: any = 0) {
    let temp = path.split('/');
    if(temp && temp.length > 0){
      if (temp[0]===''){
        temp = temp.splice(0, 1);
      }
    }
    if(temp && temp.length > 0){
      if (this.isNumeric(temp[temp.length-1])){
        id = Number(temp[temp.length-1]);
        temp.pop()
        path = <NavigationPathEnum>temp.join('/');
      }else{
        path = <NavigationPathEnum>temp.join('/');
      }
    }
    const breadcrumbList: BreadcrumbItem[] = [];
    breadcrumbList.push({title: StringResources.HOME, path: NavigationPathEnum.HOME});
    switch (path) {
      case NavigationPathEnum.ADMIN_LIST:
        breadcrumbList.push({title: StringResources.ADMIN_LIST, path: NavigationPathEnum.ADMIN_LIST});
        break;
      case NavigationPathEnum.ADMIN_MANAGE:
        breadcrumbList.push({title: StringResources.ADMIN_LIST, path: NavigationPathEnum.ADMIN_LIST});
        breadcrumbList.push({
          title: id > 0 ? StringResources.ADMIN_EDIT : StringResources.ADMIN_CREATE,
          path: NavigationPathEnum.ADMIN_MANAGE
        });
        break;
      case NavigationPathEnum.ADMIN_CHANGE_PASSWORD:
        breadcrumbList.push({title: StringResources.CHANGE_PASSWORD, path: NavigationPathEnum.ADMIN_CHANGE_PASSWORD});
        break;
      case NavigationPathEnum.ADMIN_EDIT_PROFILE:
        breadcrumbList.push({title: StringResources.EDIT_PROFILE, path: NavigationPathEnum.ADMIN_EDIT_PROFILE});
        break;
      case NavigationPathEnum.APP_USER_LIST:
        breadcrumbList.push({title: StringResources.APP_USER_LIST, path: NavigationPathEnum.APP_USER_LIST});
        break;
      case NavigationPathEnum.APP_USER_MANAGE:
        breadcrumbList.push({title: StringResources.APP_USER_LIST, path: NavigationPathEnum.APP_USER_LIST});
        breadcrumbList.push({
          title: id > 0 ? StringResources.APP_USER_EDIT : StringResources.APP_USER_CREATE,
          path: NavigationPathEnum.APP_USER_MANAGE
        });
        break;
      case NavigationPathEnum.APP_USER_DEVICE_LIST:
        breadcrumbList.push({title: StringResources.APP_USER_LIST, path: NavigationPathEnum.APP_USER_LIST});
        breadcrumbList.push({
          title: id > 0 ? StringResources.APP_USER_EDIT : StringResources.APP_USER_CREATE,
          path: NavigationPathEnum.APP_USER_MANAGE
        });
        breadcrumbList.push({
          title: StringResources.APP_USER_DEVICE_LIST,
          path: NavigationPathEnum.APP_USER_DEVICE_LIST
        });
        break;
      case NavigationPathEnum.APP_USER_LOGIN_HISTORY:
        breadcrumbList.push({title: StringResources.APP_USER_LIST, path: NavigationPathEnum.APP_USER_LIST});
        breadcrumbList.push({
          title: id > 0 ? StringResources.APP_USER_EDIT : StringResources.APP_USER_CREATE,
          path: NavigationPathEnum.APP_USER_MANAGE
        });
        breadcrumbList.push({
          title: StringResources.APP_USER_LOGIN_HISTORY,
          path: NavigationPathEnum.APP_USER_LOGIN_HISTORY
        });
        break;
      case NavigationPathEnum.CURRENT_AFFAIR_LIST:
        breadcrumbList.push({title: StringResources.CURRENT_AFFAIR_LIST, path: NavigationPathEnum.CURRENT_AFFAIR_LIST});
        break;
      case NavigationPathEnum.CURRENT_AFFAIR_MANAGE:
        breadcrumbList.push({title: StringResources.CURRENT_AFFAIR_LIST, path: NavigationPathEnum.CURRENT_AFFAIR_LIST});
        breadcrumbList.push({
          title: id > 0 ? StringResources.CURRENT_AFFAIR_EDIT : StringResources.CURRENT_AFFAIR_CREATE,
          path: NavigationPathEnum.CURRENT_AFFAIR_MANAGE
        });
        break;
      case NavigationPathEnum.EVENT_LIST:
        breadcrumbList.push({title: StringResources.EVENT_LIST, path: NavigationPathEnum.EVENT_LIST});
        break;
      case NavigationPathEnum.EVENT_MANAGE:
        breadcrumbList.push({title: StringResources.EVENT_LIST, path: NavigationPathEnum.EVENT_LIST});
        breadcrumbList.push({
          title: id > 0 ? StringResources.EVENT_EDIT : StringResources.EVENT_CREATE,
          path: NavigationPathEnum.EVENT_MANAGE
        });
        break;
      case NavigationPathEnum.EVENT_DETAIL:
        breadcrumbList.push({title: StringResources.EVENT_LIST, path: NavigationPathEnum.EVENT_LIST});
        breadcrumbList.push({
          title: StringResources.DETAIL,
          path: NavigationPathEnum.EVENT_DETAIL
        });
        break;
      case NavigationPathEnum.FAMILY_LIST:
        breadcrumbList.push({title: StringResources.FAMILY_LIST, path: NavigationPathEnum.FAMILY_LIST});
        break;
      case NavigationPathEnum.FAMILY_DETAIL:
        breadcrumbList.push({title: StringResources.FAMILY_LIST, path: NavigationPathEnum.FAMILY_LIST});
        breadcrumbList.push({title: StringResources.DETAILS, path: NavigationPathEnum.FAMILY_DETAIL});
        break;
      case NavigationPathEnum.FAMILY_MANAGE:
        breadcrumbList.push({title: StringResources.FAMILY_LIST, path: NavigationPathEnum.FAMILY_LIST});
        breadcrumbList.push({
          title: id > 0 ? StringResources.FAMILY_EDIT : StringResources.FAMILY_CREATE,
          path: NavigationPathEnum.FAMILY_MANAGE
        });
        break;
      case NavigationPathEnum.FAMILY_EDIT_PERSONAL_DETAIL:
        breadcrumbList.push({title: StringResources.FAMILY_LIST, path: NavigationPathEnum.FAMILY_LIST});
        breadcrumbList.push({title: StringResources.DETAILS, path: NavigationPathEnum.FAMILY_DETAIL, id: id});
        breadcrumbList.push({
          title: StringResources.FAMILY_EDIT,
          path: NavigationPathEnum.FAMILY_DETAIL,
          id: id
        });
        break;
      case NavigationPathEnum.JOB_LIST:
        breadcrumbList.push({title: StringResources.JOB_LIST, path: NavigationPathEnum.JOB_LIST});
        break;
      case NavigationPathEnum.JOB_MANAGE:
        breadcrumbList.push({title: StringResources.JOB_LIST, path: NavigationPathEnum.JOB_LIST});
        breadcrumbList.push({
          title: id > 0 ? StringResources.JOB_EDIT : StringResources.JOB_CREATE,
          path: NavigationPathEnum.JOB_MANAGE
        });
        break;
      case NavigationPathEnum.MATRIMONIAL_LIST:
        breadcrumbList.push({title: StringResources.MATRIMONIAL_LIST, path: NavigationPathEnum.MATRIMONIAL_LIST});
        break;
      case NavigationPathEnum.MATRIMONIAL_MANAGE:
        breadcrumbList.push({title: StringResources.MATRIMONIAL_LIST, path: NavigationPathEnum.MATRIMONIAL_LIST});
        breadcrumbList.push({
          title: id > 0 ? StringResources.MATRIMONIAL_EDIT : StringResources.MATRIMONIAL_CREATE,
          path: NavigationPathEnum.MATRIMONIAL_MANAGE
        });
        break;
      case NavigationPathEnum.TEMPLE_LIST:
        breadcrumbList.push({title: StringResources.TEMPLE_LIST, path: NavigationPathEnum.TEMPLE_LIST});
        break;
      case NavigationPathEnum.TEMPLE_MANAGE:
        breadcrumbList.push({title: StringResources.TEMPLE_LIST, path: NavigationPathEnum.TEMPLE_LIST});
        breadcrumbList.push({
          title: id > 0 ? StringResources.TEMPLE_EDIT : StringResources.TEMPLE_CREATE,
          path: NavigationPathEnum.TEMPLE_MANAGE
        });
        break;
      case NavigationPathEnum.REPORT_INQUIRY:
        breadcrumbList.push({title: StringResources.REPORT_INQUIRY, path: NavigationPathEnum.REPORT_INQUIRY});
        break;
      case NavigationPathEnum.REPORT_PUSH_NOTIFICATION:
        breadcrumbList.push({
          title: StringResources.REPORT_PUSH_NOTIFICATION,
          path: NavigationPathEnum.REPORT_PUSH_NOTIFICATION
        });
        break;
      case NavigationPathEnum.BUSINESS_LIST:
        breadcrumbList.push({title: StringResources.BUSINESS_LIST, path: NavigationPathEnum.BUSINESS_LIST});
        break;
      case NavigationPathEnum.BUSINESS_MANAGE:
        breadcrumbList.push({title: StringResources.BUSINESS_LIST, path: NavigationPathEnum.BUSINESS_LIST});
        breadcrumbList.push({
          title: id > 0 ? StringResources.BUSINESS_EDIT : StringResources.BUSINESS_CREATE,
          path: NavigationPathEnum.BUSINESS_MANAGE
        });
        break;
      case NavigationPathEnum.SERVICE_LIST:
        breadcrumbList.push({title: StringResources.SERVICE_LIST, path: NavigationPathEnum.SERVICE_LIST});
        break;
      case NavigationPathEnum.SERVICE_MANAGE:
        breadcrumbList.push({title: StringResources.SERVICE_LIST, path: NavigationPathEnum.SERVICE_LIST});
        breadcrumbList.push({
          title: id > 0 ? StringResources.SERVICE_EDIT : StringResources.SERVICE_CREATE,
          path: NavigationPathEnum.SERVICE_MANAGE
        });
        break;
      case NavigationPathEnum.COUNTRY_LIST:
        breadcrumbList.push({title: StringResources.COUNTRY_LIST, path: NavigationPathEnum.COUNTRY_LIST});
        break;
      case NavigationPathEnum.COUNTRY_MANAGE:
        breadcrumbList.push({title: StringResources.COUNTRY_LIST, path: NavigationPathEnum.COUNTRY_LIST});
        breadcrumbList.push({
          title: id > 0 ? StringResources.COUNTRY_EDIT : StringResources.COUNTRY_CREATE,
          path: NavigationPathEnum.COUNTRY_MANAGE
        });
        break;
      case NavigationPathEnum.STATE_LIST:
        breadcrumbList.push({title: StringResources.STATE_LIST, path: NavigationPathEnum.STATE_LIST});
        break;
      case NavigationPathEnum.STATE_MANAGE:
        breadcrumbList.push({title: StringResources.STATE_LIST, path: NavigationPathEnum.STATE_LIST});
        breadcrumbList.push({
          title: id > 0 ? StringResources.STATE_EDIT : StringResources.STATE_CREATE,
          path: NavigationPathEnum.STATE_MANAGE
        });
        break;
      case NavigationPathEnum.DISTRICT_LIST:
        breadcrumbList.push({title: StringResources.DISTRICT_LIST, path: NavigationPathEnum.DISTRICT_LIST});
        break;
      case NavigationPathEnum.DISTRICT_MANAGE:
        breadcrumbList.push({title: StringResources.DISTRICT_LIST, path: NavigationPathEnum.DISTRICT_LIST});
        breadcrumbList.push({
          title: id > 0 ? StringResources.DISTRICT_EDIT : StringResources.DISTRICT_CREATE,
          path: NavigationPathEnum.DISTRICT_MANAGE
        });
        break;
      case NavigationPathEnum.CITY_VILLAGE_LIST:
        breadcrumbList.push({title: StringResources.CITY_VILLAGE_LIST, path: NavigationPathEnum.CITY_VILLAGE_LIST});
        break;
      case NavigationPathEnum.CITY_VILLAGE_MANAGE:
        breadcrumbList.push({title: StringResources.CITY_VILLAGE_LIST, path: NavigationPathEnum.CITY_VILLAGE_LIST});
        breadcrumbList.push({
          title: id > 0 ? StringResources.CITY_VILLAGE_EDIT : StringResources.CITY_VILLAGE_CREATE,
          path: NavigationPathEnum.CITY_VILLAGE_MANAGE
        });
        break;
      case NavigationPathEnum.GENDER_LIST:
        breadcrumbList.push({title: StringResources.GENDER_LIST, path: NavigationPathEnum.GENDER_LIST});
        break;
      case NavigationPathEnum.GENDER_MANAGE:
        breadcrumbList.push({title: StringResources.GENDER_LIST, path: NavigationPathEnum.GENDER_LIST});
        breadcrumbList.push({
          title: id > 0 ? StringResources.GENDER_EDIT : StringResources.GENDER_CREATE,
          path: NavigationPathEnum.GENDER_MANAGE
        });
        break;
      case NavigationPathEnum.ADDICTION_LIST:
        breadcrumbList.push({title: StringResources.ADDICTION_LIST, path: NavigationPathEnum.ADDICTION_LIST});
        break;
      case NavigationPathEnum.ADDICTION_MANAGE:
        breadcrumbList.push({title: StringResources.ADDICTION_LIST, path: NavigationPathEnum.ADDICTION_LIST});
        breadcrumbList.push({
          title: id > 0 ? StringResources.ADDICTION_EDIT : StringResources.ADDICTION_CREATE,
          path: NavigationPathEnum.ADDICTION_MANAGE
        });
        break;
      case NavigationPathEnum.RELATION_SHIP_LIST:
        breadcrumbList.push({title: StringResources.RELATION_SHIP_LIST, path: NavigationPathEnum.RELATION_SHIP_LIST});
        break;
      case NavigationPathEnum.RELATION_SHIP_MANAGE:
        breadcrumbList.push({title: StringResources.RELATION_SHIP_LIST, path: NavigationPathEnum.RELATION_SHIP_LIST});
        breadcrumbList.push({
          title: id > 0 ? StringResources.RELATION_SHIP_EDIT : StringResources.RELATION_SHIP_CREATE,
          path: NavigationPathEnum.RELATION_SHIP_MANAGE
        });
        break;
      case NavigationPathEnum.RELIGION_LIST:
        breadcrumbList.push({title: StringResources.RELIGION_LIST, path: NavigationPathEnum.RELIGION_LIST});
        break;
      case NavigationPathEnum.RELIGION_MANAGE:
        breadcrumbList.push({title: StringResources.RELIGION_LIST, path: NavigationPathEnum.RELIGION_LIST});
        breadcrumbList.push({
          title: id > 0 ? StringResources.RELIGION_EDIT : StringResources.RELIGION_CREATE,
          path: NavigationPathEnum.RELIGION_MANAGE
        });
        break;
      case NavigationPathEnum.GOTRA_LIST:
        breadcrumbList.push({title: StringResources.GOTRA_LIST, path: NavigationPathEnum.GOTRA_LIST});
        break;
      case NavigationPathEnum.GOTRA_MANAGE:
        breadcrumbList.push({title: StringResources.GOTRA_LIST, path: NavigationPathEnum.GOTRA_LIST});
        breadcrumbList.push({
          title: id > 0 ? StringResources.GOTRA_EDIT : StringResources.GOTRA_CREATE,
          path: NavigationPathEnum.GOTRA_MANAGE
        });
        break;
      case NavigationPathEnum.POST_LIST:
        breadcrumbList.push({title: StringResources.POST_LIST, path: NavigationPathEnum.POST_LIST});
        break;
      case NavigationPathEnum.POST_MANAGE:
        breadcrumbList.push({title: StringResources.POST_LIST, path: NavigationPathEnum.POST_LIST});
        breadcrumbList.push({
          title: id > 0 ? StringResources.POST_EDIT : StringResources.POST_CREATE,
          path: NavigationPathEnum.POST_MANAGE
        });
        break;
      case NavigationPathEnum.JOB_TYPE_LIST:
        breadcrumbList.push({title: StringResources.JOB_TYPE_LIST, path: NavigationPathEnum.JOB_TYPE_LIST});
        break;
      case NavigationPathEnum.JOB_TYPE_MANAGE:
        breadcrumbList.push({title: StringResources.JOB_TYPE_LIST, path: NavigationPathEnum.JOB_TYPE_LIST});
        breadcrumbList.push({
          title: id > 0 ? StringResources.JOB_TYPE_EDIT : StringResources.JOB_TYPE_CREATE,
          path: NavigationPathEnum.JOB_TYPE_MANAGE
        });
        break;
      case NavigationPathEnum.JOB_CATEGORY_LIST:
        breadcrumbList.push({title: StringResources.JOB_CATEGORY_LIST, path: NavigationPathEnum.JOB_CATEGORY_LIST});
        break;
      case NavigationPathEnum.JOB_CATEGORY_MANAGE:
        breadcrumbList.push({title: StringResources.JOB_CATEGORY_LIST, path: NavigationPathEnum.JOB_CATEGORY_LIST});
        breadcrumbList.push({
          title: id > 0 ? StringResources.JOB_CATEGORY_EDIT : StringResources.JOB_CATEGORY_CREATE,
          path: NavigationPathEnum.JOB_CATEGORY_MANAGE
        });
        break;
      case NavigationPathEnum.JOB_SUB_CATEGORY_LIST:
        breadcrumbList.push({
          title: StringResources.JOB_SUB_CATEGORY_LIST,
          path: NavigationPathEnum.JOB_SUB_CATEGORY_LIST
        });
        break;
      case NavigationPathEnum.JOB_SUB_CATEGORY_MANAGE:
        breadcrumbList.push({
          title: StringResources.JOB_SUB_CATEGORY_LIST,
          path: NavigationPathEnum.JOB_SUB_CATEGORY_LIST
        });
        breadcrumbList.push({
          title: id > 0 ? StringResources.JOB_SUB_CATEGORY_EDIT : StringResources.JOB_SUB_CATEGORY_EDIT,
          path: NavigationPathEnum.JOB_SUB_CATEGORY_MANAGE
        });
        break;
      case NavigationPathEnum.FAQ_CATEGORY_LIST:
        breadcrumbList.push({title: StringResources.FAQ_CATEGORY_LIST, path: NavigationPathEnum.FAQ_CATEGORY_LIST});
        break;
      case NavigationPathEnum.FAQ_CATEGORY_MANAGE:
        breadcrumbList.push({title: StringResources.FAQ_CATEGORY_LIST, path: NavigationPathEnum.FAQ_CATEGORY_LIST});
        breadcrumbList.push({
          title: id > 0 ? StringResources.FAQ_CATEGORY_EDIT : StringResources.FAQ_CATEGORY_CREATE,
          path: NavigationPathEnum.FAQ_CATEGORY_MANAGE
        });
        break;
      case NavigationPathEnum.LEGAL_PAGE_LIST:
        breadcrumbList.push({title: StringResources.LEGAL_PAGE_LIST, path: NavigationPathEnum.LEGAL_PAGE_LIST});
        break;
      case NavigationPathEnum.LEGAL_PAGE_MANAGE:
        breadcrumbList.push({title: StringResources.LEGAL_PAGE_LIST, path: NavigationPathEnum.LEGAL_PAGE_LIST});
        breadcrumbList.push({
          title: id > 0 ? StringResources.LEGAL_PAGE_EDIT : StringResources.LEGAL_PAGE_CREATE,
          path: NavigationPathEnum.LEGAL_PAGE_MANAGE
        });
        break;
      case NavigationPathEnum.CONFIG_PARAMETER_LIST:
        breadcrumbList.push({
          title: StringResources.CONFIG_PARAMETER_LIST,
          path: NavigationPathEnum.CONFIG_PARAMETER_LIST
        });
        break;
      case NavigationPathEnum.CONFIG_PARAMETER_MANAGE:
        breadcrumbList.push({
          title: StringResources.CONFIG_PARAMETER_LIST,
          path: NavigationPathEnum.CONFIG_PARAMETER_LIST
        });
        breadcrumbList.push({
          title: id > 0 ? StringResources.CONFIG_PARAMETER_EDIT : StringResources.CONFIG_PARAMETER_CREATE,
          path: NavigationPathEnum.CONFIG_PARAMETER_MANAGE
        });
        break;
      case NavigationPathEnum.FAQ_LIST:
        breadcrumbList.push({title: StringResources.FAQ_LIST, path: NavigationPathEnum.FAQ_LIST});
        break;
      case NavigationPathEnum.FAQ_MANAGE:
        breadcrumbList.push({title: StringResources.FAQ_LIST, path: NavigationPathEnum.FAQ_LIST});
        breadcrumbList.push({
          title: id > 0 ? StringResources.FAQ_EDIT : StringResources.FAQ_CREATE,
          path: NavigationPathEnum.FAQ_MANAGE
        });
        break;
      case NavigationPathEnum.MANDAL_LIST:
        breadcrumbList.push({title: StringResources.MANDAL_LIST, path: NavigationPathEnum.MANDAL_LIST});
        break;
      case NavigationPathEnum.MANDAL_MANAGE:
        breadcrumbList.push({title: StringResources.MANDAL_LIST, path: NavigationPathEnum.MANDAL_LIST});
        breadcrumbList.push({
          title: id > 0 ? StringResources.MANDAL_EDIT : StringResources.MANDAL_CREATE,
          path: NavigationPathEnum.MANDAL_MANAGE
        });
        break;
      case NavigationPathEnum.MANDAL_MEMBER_MANAGE:
        breadcrumbList.push({
          title: StringResources.MANDAL_MEMBER_MANAGE,
          path: NavigationPathEnum.MANDAL_MEMBER_MANAGE
        });
        break;
      case NavigationPathEnum.TRUSTEE_LIST:
        breadcrumbList.push({title: StringResources.TRUSTEE_LIST, path: NavigationPathEnum.TRUSTEE_LIST});
        break;
      case NavigationPathEnum.TRUSTEE_MANAGE:
        breadcrumbList.push({title: StringResources.TRUSTEE_LIST, path: NavigationPathEnum.TRUSTEE_LIST});
        breadcrumbList.push({
          title: id > 0 ? StringResources.TRUSTEE_EDIT : StringResources.TRUSTEE_EDIT,
          path: NavigationPathEnum.TRUSTEE_MANAGE
        });
        break;
    }
    this.sharedService.setBreadcrumb(breadcrumbList);
  }
}
