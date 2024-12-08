import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public loader = false;
  private loaderSource = new BehaviorSubject(this.loader);

  setLoader(flag: boolean): void {
    this.loaderSource.next(flag);
  }

  getLoader(): any {
    return this.loaderSource.asObservable();
  }
}
