import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'family-lib-contact-number-list',
  standalone: false,
  templateUrl: './contact-number-list.component.html',
  styleUrl: './contact-number-list.component.scss',
})
export class ContactNumberListComponent {
  protected readonly router = inject(Router);

  addClick(path: string) {
    this.router.navigate([path]);
  }

  editClick(event: { path: string; id: number }) {
    this.router.navigate([event.path, event.id]);
  }
}
