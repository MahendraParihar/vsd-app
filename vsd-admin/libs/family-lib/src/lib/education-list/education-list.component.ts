import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'family-lib-education-list',
  standalone: false,
  templateUrl: './education-list.component.html',
  styleUrl: './education-list.component.scss',
})
export class EducationListComponent {
  protected readonly router = inject(Router);

  addClick(path: string) {
    this.router.navigate([path]);
  }

  editClick(event: { path: string; id: number }) {
    this.router.navigate([event.path, event.id]);
  }
}
