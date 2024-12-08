import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'vsd-web-app-base-layout',
  standalone: false,
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.scss'
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

  constructor(private router: Router) {}

  onClick(index: number, btn: { label: string; path: string; isActive: boolean }) {
    for (let i = 0; i < this.btnList.length; i++) {
      if (index === i) {
        this.btnList[i].isActive = true;
      } else {
        this.btnList[i].isActive = false;
      }
    }
    this.router.navigate([btn.path]);
  }
}
