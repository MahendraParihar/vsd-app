import {NgModule} from '@angular/core';
import {NavigationEnd, Router, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guard/auth-guard";
import {BaseLayoutComponent} from "./ui/base-layout/base-layout.component";
import {HomeComponent} from "./ui/home/home.component";
import {FaqListComponent} from "./ui/faq/faq-list/faq-list.component";
import {FaqManageComponent} from "./ui/faq/faq-manage/faq-manage.component";
import {
  ConfigParameterListComponent
} from "./ui/config-parameter/config-parameter-list/config-parameter-list.component";
import {
  ConfigParameterManageComponent
} from "./ui/config-parameter/config-parameter-manage/config-parameter-manage.component";
import {NavigationService} from "./service/navigation.service";
import {NavigationPathEnum} from "./enum/navigation-path-enum";
import {PageNotFoundComponent} from "./ui/error-pages/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: 'auth',
    pathMatch: 'prefix',
    loadChildren: () => import('./ui/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: HomeComponent
      },
      {
        path: 'admin-user',
        canActivate: [AuthGuard],
        loadChildren: () => import('./ui/admin-user/admin-user.module').then(m => m.AdminUserModule)
      },
      {
        path: 'app-user',
        canActivate: [AuthGuard],
        loadChildren: () => import('./ui/app-user/app-user.module').then(m => m.AppUserModule)
      },
      {
        path: 'current-affair',
        canActivate: [AuthGuard],
        loadChildren: () => import('./ui/current-affair/current-affair.module').then(m => m.CurrentAffairModule)
      },
      {
        path: 'event',
        canActivate: [AuthGuard],
        loadChildren: () => import('./ui/event/event.module').then(m => m.EventModule)
      },
      {
        path: 'family',
        canActivate: [AuthGuard],
        loadChildren: () => import('./ui/family/family.module').then(m => m.FamilyModule)
      },
      {
        path: 'job',
        canActivate: [AuthGuard],
        loadChildren: () => import('./ui/job/job.module').then(m => m.JobModule)
      },
      {
        path: 'lov',
        canActivate: [AuthGuard],
        loadChildren: () => import('./ui/lov/lov.module').then(m => m.LovModule)
      },
      {
        path: 'mandal',
        canActivate: [AuthGuard],
        loadChildren: () => import('./ui/mandal/mandal.module').then(m => m.MandalModule)
      },
      {
        path: 'matrimonial',
        canActivate: [AuthGuard],
        loadChildren: () => import('./ui/matrimonial/matrimonial.module').then(m => m.MatrimonialModule)
      },
      {
        path: 'report',
        canActivate: [AuthGuard],
        loadChildren: () => import('./ui/report/report.module').then(m => m.ReportModule)
      },
      {
        path: 'temple',
        canActivate: [AuthGuard],
        loadChildren: () => import('./ui/temple/temple.module').then(m => m.TempleModule)
      },
      {
        path: 'faq-list',
        canActivate: [AuthGuard],
        component: FaqListComponent
      },
      {
        path: 'faq-manage',
        canActivate: [AuthGuard],
        component: FaqManageComponent
      },
      {
        path: 'faq-manage/:id',
        canActivate: [AuthGuard],
        component: FaqManageComponent
      },
      {
        path: 'config-param-list',
        canActivate: [AuthGuard],
        component: ConfigParameterListComponent
      },
      {
        path: 'config-param-manage',
        canActivate: [AuthGuard],
        component: ConfigParameterManageComponent
      },
      {
        path: 'config-param-manage/:id',
        canActivate: [AuthGuard],
        component: ConfigParameterManageComponent
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router,
              private navigationService: NavigationService) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        if (ev.url) {
          let temp = ev.url;
          if (temp.substring(0, 1) === '/') {
            temp = temp.substring(1, temp.length);
          }
          this.navigationService.setBreadcrumb(<NavigationPathEnum>temp);
        }
      }
    });
  }
}
