import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loader: any[] = [];
  isLoading = false;

  constructor() {
  }


  load(): void {
  }

  dismiss(): void {
  }
}
