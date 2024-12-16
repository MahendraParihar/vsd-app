import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { LovApiUrl } from '../api-url';
import { IManageRelationship, IResponse, IStatusChange } from '@vsd-common/lib';

@Injectable()
export class RelationshipService {
  constructor(private httpService: HttpService) {
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(LovApiUrl.RELATIONSHIP_STATUS + '/' + id, <
      IStatusChange
      >{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageRelationship> {
    const res = await this.httpService.getRequest<IResponse<IManageRelationship>>(LovApiUrl.RELATIONSHIP + '/' + id);
    return res as IManageRelationship;
  }

  async manageRelationship(payload: IManageRelationship): Promise<IManageRelationship> {
    const res = await this.httpService.postRequest<IResponse<IManageRelationship>>(LovApiUrl.MANAGE_RELATIONSHIP, payload);
    return res as IManageRelationship;
  }
}
