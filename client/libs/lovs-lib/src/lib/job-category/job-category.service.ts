import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { LovApiUrl } from '../api-url';
import { IManageJobCategory, IResponse, IStatusChange } from '@vsd-common/lib';

@Injectable()
export class JobCategoryService {
  constructor(private httpService: HttpService) {
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(LovApiUrl.JOB_CATEGORY_STATUS + '/' + id, <
      IStatusChange
      >{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageJobCategory> {
    const res = await this.httpService.getRequest<IResponse<IManageJobCategory>>(LovApiUrl.JOB_CATEGORY + '/' + id);
    return res as IManageJobCategory;
  }

  async manageJobCategory(payload: IManageJobCategory): Promise<IManageJobCategory> {
    const res = await this.httpService.postRequest<IResponse<IManageJobCategory>>(LovApiUrl.MANAGE_JOB_CATEGORY, payload);
    return res as IManageJobCategory;
  }
}
