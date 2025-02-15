import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BreadcrumbItem } from '../interfaces/breadcrumb-item';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public loader = false;
  private loaderSource = new BehaviorSubject(this.loader);
  private breadcrumbSubject = new BehaviorSubject<BreadcrumbItem[]>([]);
  public breadcrumb = this.breadcrumbSubject.asObservable();

  setLoader(flag: boolean): void {
    this.loaderSource.next(flag);
  }

  getLoader(): any {
    return this.loaderSource.asObservable();
  }

  setBreadcrumb(obj: BreadcrumbItem[]) {
    this.breadcrumbSubject.next(obj);
  }
}
