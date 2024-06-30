import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { LovApiUrl } from '../api-url';
import { IResponse, IStatusChange } from '@vsd-common/lib';

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
}
