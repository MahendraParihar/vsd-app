import { Injectable } from '@angular/core';
// import { AESCryptoUtil } from '../utility/crypto-aes';
import { SharedService } from './shared.service';
// import { IAuthUser } from '@vsd-common/lib';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private static AUTH_USER = 'auth_user';
  private static AUTH_TOKEN = 'bToken';
  private static LABELS = 'labels';

  constructor(
    private sharedService: SharedService,
    // private userService: UserService,
  ) {
  }

  public static clearStorage(): void {
    localStorage.clear();
  }

  private static set(key: string, data: any): void {
    localStorage.setItem(key, data);
  }

  private static get(key: string): any {
    return localStorage.getItem(key);
  }

  private static delete(key: string): any {
    localStorage.removeItem(key);
  }

  // region user

  // public setAuthUser(authUser: IAuthUser): void {
  //   this.userService.login(authUser);
  //   let userStr = JSON.stringify(authUser);
  //   userStr = AESCryptoUtil.encryptUsingAES256(userStr);
  //   StorageService.set(StorageService.AUTH_USER, userStr);
  // }
  //
  // public getAuthUser(): any | null {
  //   const s = StorageService.get(StorageService.AUTH_USER);
  //   if (s) {
  //     const userStr = AESCryptoUtil.decryptUsingAES256(s);
  //     return <IAuthUser>JSON.parse(userStr);
  //   }
  //   return null;
  // }

  public clearAuthUser(): void {
    StorageService.clearStorage();
  }

  public getAuthToken() {
    const t = StorageService.get(StorageService.AUTH_TOKEN) as string;
    if (t) {
      return t;
    }
    return null;
  }

  public setAuthToken(token: string) {
    StorageService.set(StorageService.AUTH_TOKEN, token);
  }

  //endregion

  public getLabels(): Map<string, string> {
    const labels: Map<string, string> = new Map<string, string>();
    const t = JSON.parse(StorageService.get(StorageService.LABELS));
    if (t) {
      const keys = Object.keys(t);
      for (const l of keys) {
        labels.set(l, t[l]);
      }
    }
    return labels;
  }

  public setLabels(labels: Map<string, string>) {
    StorageService.set(StorageService.LABELS, JSON.stringify(Object.fromEntries(labels)));
  }
}
