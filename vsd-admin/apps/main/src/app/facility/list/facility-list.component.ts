import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'main-facility-list',
  standalone: false,
  templateUrl: './facility-list.component.html',
  styleUrl: './facility-list.component.scss',
})
export class FacilityListComponent {
  protected readonly router = inject(Router);

  addClick(path: string) {
    this.router.navigate([path]);
  }

  editClick(event: { path: string; id: number }) {
    this.router.navigate([event.path, event.id]);
  }
}
