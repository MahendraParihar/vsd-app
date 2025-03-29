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
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'vsd-admin-base-layout',
  templateUrl: './base-layout.component.html',
  standalone: false,
  styleUrl: './base-layout.component.scss',
})
export class BaseLayoutComponent implements OnInit {
  private router = inject(Router);

  labelKeys = LabelKey;
  authUserObj!: IAuthUser;

  private breakpointObserver = inject(BreakpointObserver);
  public opened = false;
  menuItems!: NavItem[];
  breadcrumbList!: BreadcrumbItem[];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
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
      console.log(authUser);
      // if (!authUser) {
      //   this.signOut();
      //   this.cdr.detectChanges();
      // } else {
      //   this.authUserObj = authUser;
      // }
    });

    this.router.events.subscribe((params) => {
      if (params instanceof NavigationEnd) {
        this.setActiveState();
      }
    });
  }

  ngOnInit() {
    this.menuItems = this.buildMenuList();
  }

  editProfile() {
    this.router.navigateByUrl(NavigationPathEnum.ADMIN_EDIT_PROFILE);
    this.navService.navigateTo(NavigationPathEnum.ADMIN_EDIT_PROFILE);
  }

  changePassword() {
    this.router.navigateByUrl(NavigationPathEnum.ADMIN_CHANGE_PASSWORD);
  }

  setting() {
    this.router.navigateByUrl(NavigationPathEnum.ADMIN_SETTING);
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
    }
  }

  onMenuClick(item: NavItem) {
    console.log(item);
    if (item.path) {
      this.router.navigateByUrl(item.path.toString());
      this.navService.navigateTo(item.path);
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
        iconName: 'list',
      },
      {
        title: 'Lovs',
        iconName: 'settings',
        path: NavigationPathEnum.LOV_MASTER,
        children: [
          {
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_JOB_CATEGORY),
            path: NavigationPathEnum.JOB_CATEGORY,
            isActive: false,
            iconName: 'list',
          },
          {
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_JOB_SUB_CATEGORY),
            path: NavigationPathEnum.JOB_SUB_CATEGORY,
            isActive: false,
            iconName: 'list',
          },
          {
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_JOB_TYPE),
            path: NavigationPathEnum.JOB_TYPE,
            isActive: false,
            iconName: 'list',
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
            iconName: 'list',
          },
          {
            title: this.labelService.getLabel(LabelKey.SIDE_MENU_SERVICE),
            path: NavigationPathEnum.SERVICE,
            isActive: false,
            iconName: 'list',
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
        ],
      },
    ];
  }

  setActiveState() {
    if (!this.menuItems || this.menuItems.length === 0) return;

    const url = this.router.url.substring(1, this.router.url.length).split('/');
    for (const s of this.menuItems) {
      s.isActive = s.path.split('/').includes(url[0]);
      if (s.children && s.children.length > 0) {
        for (const c of s.children) {
          c.isActive = c.path.split('/').includes(url[0]);
        }
      }
    }
  }
}
