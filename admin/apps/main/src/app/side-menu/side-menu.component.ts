import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NavigationService, NavItem } from '@vsd-frontend/core-lib';
import { Router } from '@angular/router';

@Component({
  selector: 'vsd-admin-side-menu',
  templateUrl: './side-menu.component.html',
  standalone: false,
  styleUrl: './side-menu.component.scss',
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
    ]),
  ],
})
export class SideMenuComponent implements OnInit {
  expanded = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item!: NavItem;
  @Input() depth!: number;
  @Output() navigate = new EventEmitter<NavItem>();

  constructor(public navService: NavigationService, public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit(): void {
    this.navService.getCurrentUrl().subscribe((url: string) => {
      if (this.item && this.item.path) {
        this.expanded = url.indexOf(`/${this.item.path}`) === 0;
        this.ariaExpanded = this.expanded;
      }
    });
  }

  onMenuClick(item: NavItem) {
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
    if (item.path) {
      this.navigate.emit(item);
    }
  }
}
