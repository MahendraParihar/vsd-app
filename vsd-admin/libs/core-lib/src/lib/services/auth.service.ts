import { Injectable } from '@angular/core';
import { IAuthUser, IChangePassword, ILogin, IResponse } from '@vsd-common/lib';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { ApiUrls } from '../api-urls';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpService: HttpService, private storageService: StorageService) {}

  async signIn(payload: ILogin): Promise<boolean> {
    const res = (await this.httpService.postRequest<
      IResponse<{
        accessToken: string;
        refreshToken: string;
      }>
    >(ApiUrls.LOGIN, payload)) as { accessToken: string; refreshToken: string };
    this.storageService.setAccessToken(res.accessToken);
    this.storageService.setRefreshToken(res.refreshToken);
    return true;
  }

  async refreshToken(): Promise<string> {
    const res = (await this.httpService.postRequest<IResponse<{ accessToken: string }>>(ApiUrls.REFRESH_TOKEN, {
      refreshToken: this.storageService.getRefreshToken(),
    })) as {
      accessToken: string;
    };
    this.storageService.setAccessToken(res.accessToken);
    return res.accessToken;
  }

  async changePassword(payload: IChangePassword): Promise<boolean> {
    const res = await this.httpService.postRequest<IResponse<boolean>>(ApiUrls.CHANGE_PASSWORD, payload);
    if (res && res.data) {
      return res.data as boolean;
    }
    return false;
  }

  async getUserProfile(): Promise<IAuthUser> {
    return (await this.httpService.getRequest<IResponse<IAuthUser>>(ApiUrls.PROFILE)) as IAuthUser;
  }
}
