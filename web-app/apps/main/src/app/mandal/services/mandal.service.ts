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
    }) as IResponse<ITableList<IMandalList>>;
    return res.data as ITableList<IMandalList>;
  }

  async loadPrimaryMandalDetails(): Promise<IMandalDetail> {
    const res = await this.http.getRequest(PRIMARY_MANDAL_DETAILS) as IResponse<IMandalDetail>;
    return res.data as IMandalDetail;
  }

  async loadMandalDetails(id: number): Promise<IMandalDetail> {
    const res = await this.http.getRequest(MANDAL_DETAILS(id)) as IResponse<IMandalDetail>;
    return res.data as IMandalDetail;
  }
}
