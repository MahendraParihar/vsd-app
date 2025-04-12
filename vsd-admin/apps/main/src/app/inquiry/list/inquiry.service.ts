import { Injectable } from '@angular/core';
import { HttpService } from '@vsd-frontend/core-lib';
import { IStatusChange } from '@vsd-common/lib';
import { InquiryApiUrl } from '../api.url';

@Injectable()
export class InquiryService {
  constructor(private httpService: HttpService) {}

  async changeStatus(id: number, status: boolean): Promise<void> {
    await this.httpService.putRequest(InquiryApiUrl.INQUIRY + '/' + id, <IStatusChange>{
      status: status,
    });
  }
}
