import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NavigationEnd, Router } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
import { LabelService } from '@core-lib';
import { LabelKey } from '@vsd-common/lib';

@Component({
  selector: 'vsd-web-app-base-layout',
  standalone: false,
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.scss',
})
export class BaseLayoutComponent {
  protected readonly LabelKey = LabelKey;
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  btnList: { label: string, path: string, isActive: boolean }[] = [];

  constructor(private router: Router,
              protected labelService: LabelService) {
    this.btnList = [
      { label: this.labelService.getLabel(LabelKey.APP_NAME), path: '', isActive: true },
      { label: this.labelService.getLabel(LabelKey.SIDE_MENU_EVENT), path: 'event', isActive: false },
      { label: this.labelService.getLabel(LabelKey.SIDE_MENU_TEMPLE), path: 'temple', isActive: false },
      { label: this.labelService.getLabel(LabelKey.SIDE_MENU_MANDAL), path: 'mandal', isActive: false },
      { label: this.labelService.getLabel(LabelKey.SIDE_MENU_HISTORY), path: 'history', isActive: false },
      { label: this.labelService.getLabel(LabelKey.SIDE_MENU_ABOUT_US), path: 'about-us', isActive: false },
      { label: this.labelService.getLabel(LabelKey.SIDE_MENU_CONTACT_US), path: 'contact-us', isActive: false },
    ];
    this.router.events.subscribe((params) => {
      if (params instanceof NavigationEnd) {
        this.setActiveState();
      }
    });
  }

  async onClick(btn: { label: string; path: string; isActive: boolean }) {
    await this.router.navigate([btn.path]);
    this.setActiveState();
  }

  setActiveState() {
    const url = this.router.url.substring(1, this.router.url.length).split('/');
    for (let s of this.btnList) {
      s.isActive = s.path.split('/').includes(url[0]);
    }
  }
}
