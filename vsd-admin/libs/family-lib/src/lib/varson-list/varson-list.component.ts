import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'family-lib-varson-list',
  standalone: false,
  templateUrl: './varson-list.component.html',
  styleUrl: './varson-list.component.scss',
})
export class VarsonListComponent {
  protected readonly router = inject(Router);

  addClick(path: string) {
    this.router.navigate([path]);
  }

  editClick(event: { path: string; id: number }) {
    this.router.navigate([event.path, event.id]);
  }
}
