import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'main-banner-list',
  standalone: false,
  templateUrl: './banner-list.component.html',
  styleUrl: './banner-list.component.scss',
})
export class BannerListComponent {
  protected readonly router = inject(Router);

  addClick(path: string) {
    this.router.navigate([path]);
  }

  editClick(event: { path: string; id: number }) {
    this.router.navigate([event.path, event.id]);
  }
}
