import { Component, Input } from '@angular/core';

@Component({
  selector: 'main-mange-pages',
  standalone: false,
  templateUrl: './mange-pages.component.html',
  styleUrl: './mange-pages.component.scss',
})
export class MangePagesComponent {
  @Input() id!: number;
}
