import { AfterContentChecked, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { SharedService } from '@vsd-frontend/core-lib';
import { Subscription } from 'rxjs';

@Component({
  selector: 'vsd-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy, AfterContentChecked {
  loader = false;
  loaderSubscription!: Subscription;

  constructor(
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef,
  ) {
    this.sharedService.getLoader().subscribe((data: boolean) => {
      this.loader = data;
    });
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.loaderSubscription) {
      this.loaderSubscription.unsubscribe();
    }
  }
}
