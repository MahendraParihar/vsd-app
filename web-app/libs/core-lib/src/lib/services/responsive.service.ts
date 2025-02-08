import { computed, inject, Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  private breakpointObserver = inject(BreakpointObserver);

  screenWidth = toSignal(this.breakpointObserver.observe([
    Breakpoints.Handset,
    Breakpoints.Tablet,
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge]));

  isHandset = computed(() => this.screenWidth()?.breakpoints[Breakpoints.Handset]);
  isTablet = computed(() => this.screenWidth()?.breakpoints[Breakpoints.Tablet]);
  isXSmall = computed(() => this.screenWidth()?.breakpoints[Breakpoints.XSmall]);
  isSmall = computed(() => this.screenWidth()?.breakpoints[Breakpoints.Small]);
  isMedium = computed(() => this.screenWidth()?.breakpoints[Breakpoints.Medium]);
  isLarge = computed(() => this.screenWidth()?.breakpoints[Breakpoints.Large]);
  isXLarge = computed(() => this.screenWidth()?.breakpoints[Breakpoints.XLarge]);
}
