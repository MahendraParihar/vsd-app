import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { LovApiUrl } from '../api-url';
import { IManagePost, IResponse, IStatusChange } from '@vsd-common/lib';

@Injectable()
export class PostService {
  constructor(private httpService: HttpService) {
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(LovApiUrl.POST_STATUS + '/' + id, <
      IStatusChange
      >{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManagePost> {
    const res = await this.httpService.getRequest<IResponse<IManagePost>>(LovApiUrl.POST_STATUS + '/' + id);
    return res as IManagePost;
  }

  async managePost(payload: IManagePost): Promise<IManagePost> {
    const res = await this.httpService.postRequest<IResponse<IManagePost>>(LovApiUrl.MANAGE_POST, payload);
    return res as IManagePost;
  }
}
