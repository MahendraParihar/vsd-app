import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'vsd-lov',
  standalone: false,
  templateUrl: './lov.component.html',
  styleUrl: './lov.component.scss',
})
export class LovComponent implements OnInit, OnDestroy {
  type: string | null = 'job-category';
  subscription!: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async () => {
      if (this.activatedRoute.snapshot.paramMap.get('type')) {
        this.type = this.activatedRoute.snapshot.paramMap.get('type');
      }
    });
    this.subscription = this.router.events.subscribe((routerEvent) => {
      if (routerEvent instanceof NavigationEnd) {
        this.type = this.router.url.substring(
          this.router.url.lastIndexOf('/') + 1
        );
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
