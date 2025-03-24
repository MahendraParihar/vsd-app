import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { IManageEvent, IResponse, IStatusChange } from '@vsd-common/lib';
import { EventApiUrl } from './api-url';

@Injectable()
export class EventService {
  constructor(private httpService: HttpService) {
  }

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(EventApiUrl.EVENT_STATUS + '/' + id, <
      IStatusChange
      >{
      status: status,
    });
  }

  async loadDetails(id: number): Promise<IManageEvent> {
    const res = await this.httpService.getRequest<IResponse<IManageEvent>>(EventApiUrl.EVENT + '/' + id);
    return res as IManageEvent;
  }

  async manageEvent(payload: IManageEvent): Promise<IManageEvent> {
    const res = await this.httpService.postRequest<IResponse<IManageEvent>>(EventApiUrl.MANAGE_EVENT, payload);
    return res as IManageEvent;
  }
}
