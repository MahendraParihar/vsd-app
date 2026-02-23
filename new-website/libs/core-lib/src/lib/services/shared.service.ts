import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private dataSubject = new BehaviorSubject<any>(null);
  public data$: Observable<any> = this.dataSubject.asObservable();

  setData(data: any): void {
    this.dataSubject.next(data);
  }

  getData(): any {
    return this.dataSubject.value;
  }
}

