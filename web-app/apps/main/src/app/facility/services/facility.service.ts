import { Injectable } from '@angular/core';
import { HttpService } from '@core-lib';
import { IFacilityDetail, IFacilityList, IResponse, ITableList, ITableListFilter } from '@vsd-common/lib';
import { FACILITY_DETAILS, FACILITY_LIST, HOME_FACILITY } from '../facility.url';

@Injectable()
export class FacilityService {
  constructor(private http: HttpService) {
  }

  async loadFacilities(pageNo: number = 0): Promise<ITableList<IFacilityList>> {
    const res = await this.http.postRequest(FACILITY_LIST, <ITableListFilter>{
      page: pageNo,
      limit: 100,
    }) as IResponse<ITableList<IFacilityList>>;
    return res as unknown as ITableList<IFacilityList>;
  }

  async loadFacilityDetails(url: string): Promise<IFacilityDetail> {
    const res = await this.http.getRequest(FACILITY_DETAILS(url)) as IResponse<IFacilityDetail>;
    return res as IFacilityDetail;
  }

  async loadHomeFacilities(): Promise<IFacilityList[]> {
    const res = await this.http.getRequest(HOME_FACILITY) as IResponse<IFacilityList[]>;
    return res as IFacilityList[];
  }
}
