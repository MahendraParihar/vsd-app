import { AfterContentChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { LabelService, SharedService } from '@vsd-frontend/core-lib';
import { Subscription } from 'rxjs';

@Component({
  selector: 'vsd-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy, AfterContentChecked, OnInit {
  loader = false;
  loaderSubscription!: Subscription;

  constructor(
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef,
    private labelService: LabelService,
  ) {
    this.sharedService.getLoader().subscribe((data: boolean) => {
      this.loader = data;
    });
  }

  async ngOnInit() {
    this.labelService.getLabel('admin');
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
