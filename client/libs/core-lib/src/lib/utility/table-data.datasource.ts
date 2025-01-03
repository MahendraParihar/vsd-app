import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { IResponse, ITableList, ITableListFilter } from '@vsd-common/lib';
import { HttpService } from '../services';

export class TableDataDatasource<T> implements DataSource<T> {
  private dataSubject = new BehaviorSubject<T[]>([]);
  private totalCountSubject = new BehaviorSubject<number>(0);
  totalCount = this.totalCountSubject.asObservable();

  constructor(private httpService: HttpService) {
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
  }

  async loadData(url: string, payload: ITableListFilter): Promise<void> {
    const res = (await this.httpService.postRequest<IResponse<ITableList<T>>>(url, payload)) as unknown as ITableList<T>;
    this.totalCountSubject.next(res.count);
    this.dataSubject.next(res.data);
  }
}
