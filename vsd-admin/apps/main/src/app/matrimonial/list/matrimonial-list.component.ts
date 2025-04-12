import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'main-matrimonial-list',
  standalone: false,
  templateUrl: './matrimonial-list.component.html',
  styleUrl: './matrimonial-list.component.scss',
})
export class MatrimonialListComponent {
  protected readonly router = inject(Router);

  addClick(path: string) {
    this.router.navigate([path]);
  }

  editClick(event: { path: string; id: number }) {
    this.router.navigate([event.path, event.id]);
  }
}
