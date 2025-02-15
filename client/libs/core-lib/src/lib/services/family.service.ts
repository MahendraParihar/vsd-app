import { Injectable } from '@angular/core';
import { ApiUrls } from '../api-urls';
import { HttpService } from './http.service';
import { IFamilyList, IResponse, ITableListFilter } from '@vsd-common/lib';

@Injectable()
export class FamilyService {
  constructor(private httpService: HttpService) {
  }

  async searchFamilies(ids: number[] = [], str: string | null = null): Promise<IFamilyList[]> {
    const payload: ITableListFilter = {
      page: 0,
      limit: 10,
    };
    if (str) {
      payload.search = str;
    }
    if (ids && ids.length > 0) {
      payload.ids = ids;
    }
    const res = (await this.httpService.postRequest<IResponse<IFamilyList>>(ApiUrls.FAMILY, payload)) as unknown as IFamilyList[];
    return res as IFamilyList[];
  }
}
