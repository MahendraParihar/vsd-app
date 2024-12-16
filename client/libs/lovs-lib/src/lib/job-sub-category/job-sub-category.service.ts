import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { LovApiUrl } from '../api-url';
import { IManageJobSubCategory, IResponse, IStatusChange } from '@vsd-common/lib';

@Injectable()
export class JobSubCategoryService {
  constructor(private httpService: HttpService) {
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(LovApiUrl.JOB_SUB_CATEGORY_STATUS + '/' + id, <
      IStatusChange
      >{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageJobSubCategory> {
    const res = await this.httpService.getRequest<IResponse<IManageJobSubCategory>>(LovApiUrl.JOB_SUB_CATEGORY + '/' + id);
    return res as IManageJobSubCategory;
  }

  async manageJobSubCategory(payload: IManageJobSubCategory): Promise<IManageJobSubCategory> {
    const res = await this.httpService.postRequest<IResponse<IManageJobSubCategory>>(LovApiUrl.MANAGE_JOB_SUB_CATEGORY, payload);
    return res as IManageJobSubCategory;
  }
}
