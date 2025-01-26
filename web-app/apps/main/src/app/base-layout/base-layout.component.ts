import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
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
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  btnList: { label: string, path: string, isActive: boolean }[] = [];

  constructor(private router: Router,
              private labelService: LabelService) {
    this.btnList = [
      { label: 'श्री विश्वकर्मा वंश सुथार समाज', path: '/', isActive: true },
      { label: this.labelService.getLabel(LabelKey.SIDE_MENU_EVENT), path: 'event', isActive: false },
      { label: this.labelService.getLabel(LabelKey.SIDE_MENU_TEMPLE), path: 'temple', isActive: false },
      { label: this.labelService.getLabel(LabelKey.SIDE_MENU_MANDAL), path: 'mandal', isActive: false },
      { label: this.labelService.getLabel(LabelKey.SIDE_MENU_HISTORY), path: 'history', isActive: false },
      { label: this.labelService.getLabel(LabelKey.SIDE_MENU_ABOUT_US), path: 'about-us', isActive: false },
      { label: this.labelService.getLabel(LabelKey.SIDE_MENU_CONTACT_US), path: 'contact-us', isActive: false },
    ];
    this.setActiveState();
  }

  async onClick(btn: { label: string; path: string; isActive: boolean }) {
    await this.router.navigate([btn.path]);
    this.setActiveState();
  }

  setActiveState() {
    let url = this.router.url.substring(1, this.router.url.length);
    if (url === '') {
      url = '/';
    }
    for (const s of this.btnList) {
      s.isActive = (url.includes(s.path));
    }
  }
}
