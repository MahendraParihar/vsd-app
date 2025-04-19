import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { LovApiUrl } from '../api-url';
import { IFaqCategory, IManageFaqCategory, IResponse, IStatusChange } from '@vsd-common/lib';

@Injectable()
export class FaqCategoryService {
  constructor(private httpService: HttpService) {}

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(LovApiUrl.FAQ_CATEGORY_STATUS + '/' + id, <IStatusChange>{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageFaqCategory> {
    const res = await this.httpService.getRequest<IResponse<IManageFaqCategory>>(LovApiUrl.FAQ_CATEGORY + '/' + id);
    return res as IManageFaqCategory;
  }

  async manageFaqCategory(payload: IManageFaqCategory): Promise<IManageFaqCategory> {
    const res = await this.httpService.postRequest<IResponse<IManageFaqCategory>>(
      LovApiUrl.MANAGE_FAQ_CATEGORY,
      payload,
    );
    return res as IManageFaqCategory;
  }

  async loadAll(): Promise<IFaqCategory[]> {
    const res = await this.httpService.getRequest<IResponse<IFaqCategory[]>>(LovApiUrl.FAQ_CATEGORY);
    return res as IFaqCategory[];
  }
}
