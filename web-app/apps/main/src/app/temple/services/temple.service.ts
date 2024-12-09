import { Injectable } from '@angular/core';
import { HttpService } from '@core-lib';
import { IResponse, ITableList, ITableListFilter, ITemple, ITempleList } from '@vsd-common/lib';
import { TEMPLE, TEMPLE_DETAILS } from '../temple.url';

@Injectable()
export class TempleService {
  constructor(private http: HttpService) {
  }

  async loadTemples(pageNo: number = 0): Promise<ITableList<ITempleList>> {
    const res = await this.http.postRequest(TEMPLE, <ITableListFilter>{
      page: pageNo,
      limit: 9,
    }) as IResponse<ITableList<ITempleList>>;
    return res as unknown as ITableList<ITempleList>;
  }

  async loadTempleDetails(id: number): Promise<ITemple> {
    const res = await this.http.getRequest(TEMPLE_DETAILS(id)) as IResponse<ITemple>;
    return res as ITemple;
  }
}
