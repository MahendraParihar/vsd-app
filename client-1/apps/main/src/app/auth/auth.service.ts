import { Injectable } from '@angular/core';
import { ApiUrls, HttpService, StorageService } from '@vsd-frontend/core-lib';
import { ILogin, IResponse } from '@vsd-common/lib';

@Injectable()
export class AuthService {
  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  async signIn(payload: ILogin): Promise<boolean> {
    const res = (await this.httpService.postRequest<IResponse<{ token: string }>>(ApiUrls.LOGIN, payload)) as {token: string};
    if (res && res.token) {
      this.storageService.setAuthToken(res.token);
      return true;
    }
    return false;
  }
}
