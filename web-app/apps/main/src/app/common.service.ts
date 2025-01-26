import { Injectable } from '@angular/core';
import { HttpService } from '@core-lib';
import { MISC_PAGE } from './common.url';
import { ILegalPageList, IResponse } from '@vsd-common/lib';

@Injectable()
export class CommonService {
  constructor(private http: HttpService) {
  }

  async loadPage(page: string) {
    const res = await this.http.getRequest(MISC_PAGE(page)) as IResponse<ILegalPageList>;
    return res as unknown as ILegalPageList;
  }
}
