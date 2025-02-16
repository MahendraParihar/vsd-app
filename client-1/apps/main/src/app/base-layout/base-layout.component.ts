import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import {
  BreadcrumbItem,
  LabelService,
  NavigationPathEnum,
  NavigationService,
  NavItem,
  SharedService,
  UserService,
} from '@vsd-frontend/core-lib';
import { IAuthUser, LabelKey } from '@vsd-common/lib';

@Component({
  selector: 'vsd-base-layout',
  templateUrl: './base-layout.component.html',
  standalone: false,
  styleUrl: './base-layout.component.scss',
})
export class BaseLayoutComponent implements OnInit {
  labelKeys = LabelKey;
  authUserObj!: IAuthUser;

  private breakpointObserver = inject(BreakpointObserver);
  public opened = false;
  menuItems!: NavItem[];
  breadcrumbList!: BreadcrumbItem[];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    private navService: NavigationService,
    private sharedService: SharedService,
    private userService: UserService,
    public labelService: LabelService,
  ) {
    this.sharedService.breadcrumb.subscribe((itemList: BreadcrumbItem[]) => {
      if (!itemList || itemList.length === 0) {
        this.breadcrumbList = [];
        this.breadcrumbList.push({ title: this.labelService.getLabel(LabelKey.SIDE_MENU_HOME) });
      } else {
        this.breadcrumbList = itemList;
      }
    });
    this.userService.loginUser.subscribe((authUser: IAuthUser | null) => {
      // if (!authUser) {
      //   this.signOut();
      //   this.cdr.detectChanges();
      // } else {
      //   this.authUserObj = authUser;
      // }
    });
  }

  ngOnInit() {
    this.menuItems = this.buildMenuList();
  }

  editProfile() {
    this.navService.navigateTo(NavigationPathEnum.ADMIN_EDIT_PROFILE);
  }

  changePassword() {
    this.navService.navigateTo(NavigationPathEnum.ADMIN_CHANGE_PASSWORD);
  }

  setting() {
    this.navService.navigateTo(NavigationPathEnum.ADMIN_SETTING);
  }

  signOut() {
    this.navService.signOut();
  }

  closeDrawer() {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }

  onItemClicked(item: BreadcrumbItem) {
    if (item.path) {
      if (item.id && item.id > 0) {
        this.navService.navigateToById(item.path, item.id);
      } else {
        this.navService.navigateTo(item.path);
      }
      this.closeDrawer();
    }
  }

  toggleTheme() {
    if (document.body.classList.contains('dark-theme')) {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    }
  }

  buildMenuList(): NavItem[] {
    return [
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_HOME),
        path: NavigationPathEnum.HOME,
        iconName: 'home',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_BANNER),
        path: NavigationPathEnum.BANNER,
        iconName: 'image',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_FAMILY),
        path: NavigationPathEnum.FAMILY,
        iconName: 'people',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_TEMPLE),
        path: NavigationPathEnum.TEMPLE,
        iconName: 'temple_hindu',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_FACILITY),
        path: NavigationPathEnum.FACILITY,
        iconName: 'menu_book',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_MANDAL),
        path: NavigationPathEnum.MANDAL,
        iconName: 'corporate_fare',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_EVENT),
        path: NavigationPathEnum.EVENT,
        iconName: 'menu_book',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_NEWS),
        path: NavigationPathEnum.NEWS,
        iconName: 'newspaper',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_JOB),
        path: NavigationPathEnum.JOB,
        iconName: 'work_outline',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_INQUIRY),
        path: NavigationPathEnum.INQUIRY,
        iconName: 'contact_support',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_MATRIMONIAL),
        path: NavigationPathEnum.MATRIMONIAL,
        iconName: 'diversity_1',
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_FAQ),
        iconName: 'quiz',
        path: NavigationPathEnum.FAQ,
      },
      {
        title: this.labelService.getLabel(LabelKey.SIDE_MENU_PAGES),
        iconName: 'list',
        path: NavigationPathEnum.PAGE,
      },
      {
        title: 'Lovs',
        iconName: 'settings',
        children: [
          {
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_JOB_CATEGORY),
            path: NavigationPathEnum.JOB_CATEGORY,
            iconName: 'list',
          },
          {
            title: this.labelService.getLabel(
              LabelKey.SIDE_MENU_JOB_SUB_CATEGORY,
            ),
            path: NavigationPathEnum.JOB_SUB_CATEGORY,
            iconName: 'list',
          },
          {
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_JOB_TYPE),
            path: NavigationPathEnum.JOB_TYPE,
            iconName: 'list',
          },
          {
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_JOB_STATUS),
            path: NavigationPathEnum.JOB_STATUS,
            iconName: 'list',
          },
          {
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_FAQ_CATEGORY),
            path: NavigationPathEnum.FAQ_CATEGORY,
            iconName: 'list',
          },
          {
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_BUSINESS),
            path: NavigationPathEnum.BUSINESS,
            iconName: 'list',
          },
          {
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_SERVICE),
            path: NavigationPathEnum.SERVICE,
            iconName: 'list',
          },
          {
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_CITY_VILLAGE),
            path: NavigationPathEnum.CITY_VILLAGE,
            iconName: 'list',
          },
          {
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_STATE),
            path: NavigationPathEnum.STATE,
            iconName: 'list',
          },
          {
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_DISTRICT),
            path: NavigationPathEnum.DISTRICT,
            iconName: 'list',
          },
          {
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_COUNTRY),
            path: NavigationPathEnum.COUNTRY,
            iconName: 'list',
          },
          {
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_ADDICTION),
            path: NavigationPathEnum.ADDICTION,
            iconName: 'list',
          },
          {
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_EDUCATION_DEGREE),
            path: NavigationPathEnum.EDUCATION_DEGREE,
            iconName: 'list',
          },
          {
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_GENDER),
            path: NavigationPathEnum.GENDER,
            iconName: 'list',
          },
          {
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_CASTE),
            path: NavigationPathEnum.CASTE,
            iconName: 'list',
          },
          {
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_RELATIONSHIP),
            path: NavigationPathEnum.RELATIONSHIP,
            iconName: 'list',
          },
          {
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_RELIGION),
            path: NavigationPathEnum.RELIGION,
            iconName: 'list',
          },
          {
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_GOTRA),
            path: NavigationPathEnum.GOTRA,
            iconName: 'list',
          },
          {
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_MARITAL_STATUS),
            path: NavigationPathEnum.MARITAL_STATUS,
            iconName: 'list',
          },
          {
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_RAASI),
            path: NavigationPathEnum.RAASI,
            iconName: 'list',
          },
          {
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_MATRIMONIAL_STATUS),
            path: NavigationPathEnum.MATRIMONIAL_STATUS,
            iconName: 'list',
          },
          {
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_MATRIMONIAL_REQUESTED_STATUS),
            path: NavigationPathEnum.MATRIMONIAL_REQUESTED_STATUS,
            iconName: 'list',
          },
          {
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_POST),
            path: NavigationPathEnum.POST,
            iconName: 'list',
          },
          {
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_ADDRESS_TYPE),
            path: NavigationPathEnum.ADDRESS_TYPE,
            iconName: 'list',
          },
          {
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_CONTACT_TYPE),
            path: NavigationPathEnum.CONTACT_TYPE,
            iconName: 'list',
          },
        ],
      },
    ];
  }
}
