import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { LabelService, NavigationPathEnum, NavigationService, NavItem } from '@vsd-frontend/core-lib';
import { MediaMatcher } from '@angular/cdk/layout';
import { LabelKey } from '@vsd-common/lib';
import { Router } from '@angular/router';

@Component({
  selector: 'main-base-layout',
  standalone: false,
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.scss',
})
export class BaseLayoutComponent implements OnInit, OnDestroy {
  title = 'main';
  protected readonly router = inject(Router);
  protected readonly labelService = inject(LabelService);
  protected readonly media = inject(MediaMatcher);
  protected readonly navigationService = inject(NavigationService);
  protected readonly isMobile = signal(true);
  protected readonly _mobileQuery: MediaQueryList;
  protected _sideNavList!: NavItem[];
  protected readonly _mobileQueryListener: () => void;
  protected _rightActionMenu!: NavItem[];

  constructor() {
    this._mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit() {
    this.buildRightActionMenu();
    this.buildMenuList();
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  buildRightActionMenu() {
    this._rightActionMenu = [
      {
        path: NavigationPathEnum.ADMIN_EDIT_PROFILE,
        iconName: 'edit',
        title: this.labelService.getLabel(LabelKey.ACTION_EDIT),
        isActive: false,
      },
      {
        path: NavigationPathEnum.ADMIN_CHANGE_PASSWORD,
        iconName: 'lock',
        title: this.labelService.getLabel(LabelKey.ACTION_CHANGE_PASSWORD),
        isActive: false,
      },
      {
        path: NavigationPathEnum.ADMIN_SETTING,
        iconName: 'logout',
        title: this.labelService.getLabel(LabelKey.ACTION_LOGOUT),
        isActive: false,
      },
    ];
  }

  buildMenuList() {
    this._sideNavList = [
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_HOME),
        path: NavigationPathEnum.HOME,
        isActive: false,
        iconName: 'home',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_BANNER),
        path: NavigationPathEnum.BANNER,
        isActive: false,
        iconName: 'image',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_FAMILY),
        path: NavigationPathEnum.FAMILY,
        isActive: false,
        iconName: 'people',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_TEMPLE),
        path: NavigationPathEnum.TEMPLE,
        isActive: false,
        iconName: 'temple_hindu',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_FACILITY),
        path: NavigationPathEnum.FACILITY,
        isActive: false,
        iconName: 'menu_book',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_MANDAL),
        path: NavigationPathEnum.MANDAL,
        isActive: false,
        iconName: 'corporate_fare',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_EVENT),
        path: NavigationPathEnum.EVENT,
        isActive: false,
        iconName: 'menu_book',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_NEWS),
        path: NavigationPathEnum.NEWS,
        isActive: false,
        iconName: 'newspaper',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_JOB),
        path: NavigationPathEnum.JOB,
        isActive: false,
        iconName: 'work_outline',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_INQUIRY),
        path: NavigationPathEnum.INQUIRY,
        isActive: false,
        iconName: 'contact_support',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_MATRIMONIAL),
        path: NavigationPathEnum.MATRIMONIAL,
        isActive: false,
        iconName: 'diversity_1',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_FAQ),
        path: NavigationPathEnum.FAQ,
        isActive: false,
        iconName: 'quiz',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_PAGES),
        path: NavigationPathEnum.PAGE,
        isActive: false,
        iconName: 'auto_stories',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_JOB_CATEGORY),
        path: NavigationPathEnum.JOB_CATEGORY,
        isActive: false,
        iconName: 'category_search',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_JOB_SUB_CATEGORY),
        path: NavigationPathEnum.JOB_SUB_CATEGORY,
        isActive: false,
        iconName: 'category',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_JOB_TYPE),
        path: NavigationPathEnum.JOB_TYPE,
        isActive: false,
        iconName: 'text_fields',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_JOB_STATUS),
        path: NavigationPathEnum.JOB_STATUS,
        isActive: false,
        iconName: 'list',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_FAQ_CATEGORY),
        path: NavigationPathEnum.FAQ_CATEGORY,
        isActive: false,
        iconName: 'list',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_BUSINESS),
        path: NavigationPathEnum.BUSINESS,
        isActive: false,
        iconName: 'business_center',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_SERVICE),
        path: NavigationPathEnum.SERVICE,
        isActive: false,
        iconName: 'work',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_CITY_VILLAGE),
        path: NavigationPathEnum.CITY_VILLAGE,
        isActive: false,
        iconName: 'list',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_STATE),
        path: NavigationPathEnum.STATE,
        isActive: false,
        iconName: 'list',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_DISTRICT),
        path: NavigationPathEnum.DISTRICT,
        isActive: false,
        iconName: 'list',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_COUNTRY),
        path: NavigationPathEnum.COUNTRY,
        isActive: false,
        iconName: 'list',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_ADDICTION),
        path: NavigationPathEnum.ADDICTION,
        isActive: false,
        iconName: 'list',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_EDUCATION_DEGREE),
        path: NavigationPathEnum.EDUCATION_DEGREE,
        isActive: false,
        iconName: 'list',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_GENDER),
        path: NavigationPathEnum.GENDER,
        isActive: false,
        iconName: 'list',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_CASTE),
        path: NavigationPathEnum.CASTE,
        isActive: false,
        iconName: 'list',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_RELATIONSHIP),
        path: NavigationPathEnum.RELATIONSHIP,
        isActive: false,
        iconName: 'list',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_RELIGION),
        path: NavigationPathEnum.RELIGION,
        isActive: false,
        iconName: 'list',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_GOTRA),
        path: NavigationPathEnum.GOTRA,
        isActive: false,
        iconName: 'list',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_MARITAL_STATUS),
        path: NavigationPathEnum.MARITAL_STATUS,
        isActive: false,
        iconName: 'list',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_RAASI),
        path: NavigationPathEnum.RAASI,
        isActive: false,
        iconName: 'list',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_MATRIMONIAL_STATUS),
        path: NavigationPathEnum.MATRIMONIAL_STATUS,
        isActive: false,
        iconName: 'list',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_MATRIMONIAL_REQUESTED_STATUS),
        path: NavigationPathEnum.MATRIMONIAL_REQUESTED_STATUS,
        isActive: false,
        iconName: 'list',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_POST),
        path: NavigationPathEnum.POST,
        isActive: false,
        iconName: 'list',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_ADDRESS_TYPE),
        path: NavigationPathEnum.ADDRESS_TYPE,
        isActive: false,
        iconName: 'list',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_CONTACT_TYPE),
        path: NavigationPathEnum.CONTACT_TYPE,
        isActive: false,
        iconName: 'list',
      },
    ];
  }

  headerMenuItemClick(event: { index: number; path: NavItem }) {
    this.router.navigate([`/${event.path.path}`]);
  }

  menuItemClick(index: number, path: NavItem) {
    if (!this._sideNavList) {
      return;
    }
    for (let s = 0; s < this._sideNavList.length; s++) {
      this._sideNavList[s].isActive = index === s;
    }
    this.router.navigate([`/${path.path}`]);
  }
}
