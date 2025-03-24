import { AfterContentChecked, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'vsd-admin-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy, AfterContentChecked {
  title = 'VSD';
  loader = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {}
}
