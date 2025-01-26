import { Injectable } from '@angular/core';
import { HttpService } from '@core-lib';
import { IEventDetail, IEventList, IResponse, ITableList, ITableListFilter } from '@vsd-common/lib';
import { EVENT, EVENT_DETAILS } from '../event.url';

@Injectable()
export class EventService {
  constructor(private http: HttpService) {
  }

  async loadEvents(pageNo: number = 0): Promise<ITableList<IEventList>> {
    const res = await this.http.postRequest(EVENT, <ITableListFilter>{
      page: pageNo,
      limit: 100,
    }) as IResponse<ITableList<IEventList>>;
    return res as unknown as ITableList<IEventList>;
  }

  async loadEventDetails(url: string): Promise<IEventDetail> {
    const res = await this.http.getRequest(EVENT_DETAILS(url)) as IResponse<IEventDetail>;
    return res as IEventDetail;
  }
}
