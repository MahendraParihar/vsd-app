import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'main-lov-list',
  standalone: false,
  templateUrl: './lov-list.component.html',
  styleUrl: './lov-list.component.scss',
})
export class LovListComponent {
  protected readonly router = inject(Router);

  _type: string | null = 'job-category';

  @Input()
  set type(typeUrl: string) {
    this._type = typeUrl;
  }

  addClick(path: string) {
    this.router.navigate([path]);
  }

  editClick(event: { path: string; id: number }) {
    this.router.navigate([event.path, event.id]);
  }
}
