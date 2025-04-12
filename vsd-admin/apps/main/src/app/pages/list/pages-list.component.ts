import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'main-pages-list',
  standalone: false,
  templateUrl: './pages-list.component.html',
  styleUrl: './pages-list.component.scss',
})
export class PagesListComponent {
  protected readonly router = inject(Router);

  addClick(path: string) {
    this.router.navigate([path]);
  }

  editClick(event: { path: string; id: number }) {
    this.router.navigate([event.path, event.id]);
  }
}
