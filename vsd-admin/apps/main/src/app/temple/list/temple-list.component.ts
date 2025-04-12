import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'main-temple-list',
  standalone: false,
  templateUrl: './temple-list.component.html',
  styleUrl: './temple-list.component.scss',
})
export class TempleListComponent {
  protected readonly router = inject(Router);

  addClick(path: string) {
    this.router.navigate([path]);
  }

  editClick(event: { path: string; id: number }) {
    this.router.navigate([event.path, event.id]);
  }
}
