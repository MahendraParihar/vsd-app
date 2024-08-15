import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'vsd-web-app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
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
