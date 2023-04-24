import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {BreadcrumbItem} from "../interfaces/breadcrumb-item";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private loginUserSubject = new BehaviorSubject<any>(null);
  public loginUser = this.loginUserSubject.asObservable();
  private breadcrumbSubject = new BehaviorSubject<BreadcrumbItem[]>(null);
  public breadcrumb = this.breadcrumbSubject.asObservable();

  constructor() {
  }

  setLoginUser(memberObj: any) {
    this.loginUserSubject.next(memberObj);
  }

  setBreadcrumb(obj: BreadcrumbItem[]) {
    this.breadcrumbSubject.next(obj);
  }
}
