import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';

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

  btnList = [
    { label: 'श्री विश्वकर्मा वंश सुथार समाज', path: '/', isActive: true },
    { label: 'आयोजन', path: 'event', isActive: false },
    { label: 'मंदिर सूची', path: 'temple', isActive: false },
    { label: 'मंडल सूची', path: 'mandal', isActive: false },
    { label: 'इतिहास', path: 'history', isActive: false },
    { label: 'हमारे बारे में', path: 'about-us', isActive: false },
    { label: 'संपर्क करें', path: 'contact-us', isActive: false },
  ];

  constructor(private router: Router) {
    this.setActiveState()
  }

  async onClick(btn: { label: string; path: string; isActive: boolean }) {
    await this.router.navigate([btn.path]);
    this.setActiveState();
  }

  setActiveState() {
    const url = this.router.url.substring(1, this.router.url.length);
    for (const s of this.btnList) {
      s.isActive = (url.includes(s.path === '/' ? '' : s.path));
    }
  }
}
