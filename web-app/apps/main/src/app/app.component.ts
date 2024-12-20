import { AfterContentChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LabelService, SharedService } from '@core-lib';

@Component({
  selector: 'vsd-web-app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy, AfterContentChecked, OnInit {
  loader = false;
  loaderSubscription!: Subscription;

  constructor(private labelService: LabelService,
              private sharedService: SharedService,
              private cdr: ChangeDetectorRef) {
    this.sharedService.getLoader().subscribe((data: boolean) => {
      this.loader = data;
    });
  }

  async ngOnInit() {
    this.labelService.getLabel('web');
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
