import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BreadcrumbItem } from '@vsd-frontend/core-lib';

@Component({
  selector: 'lib-family-detail',
  standalone: false,
  templateUrl: './family-detail.component.html',
  styleUrl: './family-detail.component.scss',
})
export class FamilyDetailComponent {

  _path!: string;

  @Input()
  set url(url: string) {
    this._path = url;
    this.activeSideNavItem(this._path);
  }

  @Input() path!: string;

  constructor(private router: Router) {
    this.router.events.subscribe((params) => {
      console.log(params);
      if (params instanceof NavigationEnd) {

      }
    });
  }

  setSideNav(){

  }

  activeSideNavItem(path:string){
    console.log(path);
  }
}
