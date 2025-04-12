import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { LovApiUrl } from '../api-url';
import { IManageEducationDegree, IResponse, IStatusChange } from '@vsd-common/lib';

@Injectable()
export class EducationDegreeService {
  constructor(private httpService: HttpService) {
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(LovApiUrl.EDUCATION_DEGREE_STATUS + '/' + id, <
      IStatusChange
      >{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageEducationDegree> {
    const res = await this.httpService.getRequest<IResponse<IManageEducationDegree>>(LovApiUrl.EDUCATION_DEGREE + '/' + id);
    return res as IManageEducationDegree;
  }

  async manageEducationDegree(payload: IManageEducationDegree): Promise<IManageEducationDegree> {
    const res = await this.httpService.postRequest<IResponse<IManageEducationDegree>>(LovApiUrl.MANAGE_EDUCATION_DEGREE, payload);
    return res as IManageEducationDegree;
  }
}
