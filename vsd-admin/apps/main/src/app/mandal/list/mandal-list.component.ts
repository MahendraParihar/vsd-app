import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'main-mandal-list',
  standalone: false,
  templateUrl: './mandal-list.component.html',
  styleUrl: './mandal-list.component.scss',
})
export class MandalListComponent {
  protected readonly router = inject(Router);

  addClick(path: string) {
    this.router.navigate([path]);
  }

  editClick(event: { path: string; id: number }) {
    this.router.navigate([event.path, event.id]);
  }
}
