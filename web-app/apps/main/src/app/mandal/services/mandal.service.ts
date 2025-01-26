import { Injectable } from '@angular/core';
import { HttpService } from '@core-lib';
import { MANDAL_DETAILS, MANDAL_LIST, PRIMARY_MANDAL_DETAILS } from '../manda.url';
import { IMandalDetail, IMandalList, IResponse, ITableList, ITableListFilter } from '@vsd-common/lib';

@Injectable()
export class MandalService {
  constructor(private http: HttpService) {
  }

  async loadMandals(pageNo: number = 0): Promise<ITableList<IMandalList>> {
    const res = await this.http.postRequest(MANDAL_LIST, <ITableListFilter>{
      page: pageNo,
      limit: 100,
    }) as IResponse<ITableList<IMandalList>>;
    return res as unknown as ITableList<IMandalList>;
  }

  async loadPrimaryMandalDetails(): Promise<IMandalDetail> {
    const res = await this.http.getRequest(PRIMARY_MANDAL_DETAILS) as IResponse<IMandalDetail>;
    return res as unknown as IMandalDetail;
  }

  async loadMandalDetails(url: string): Promise<IMandalDetail> {
    const res = await this.http.getRequest(MANDAL_DETAILS(url)) as IResponse<IMandalDetail>;
    return res as IMandalDetail;
  }
}
