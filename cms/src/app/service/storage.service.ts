import {AuthUserModel} from "../models/auth-user.model";
import {AESCryptoUtil} from "../utilites/crypto-aes";
import {Injectable} from "@angular/core";
import {SharedService} from "./shared.service";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private static AUTH_USER = 'auth_user';

  constructor(private sharedService: SharedService) {
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

  public setAuthUser(authUser: AuthUserModel): void {
    this.sharedService.setLoginUser(authUser);
    let userStr = JSON.stringify(authUser);
    userStr = AESCryptoUtil.encryptUsingAES256(userStr);
    StorageService.set(StorageService.AUTH_USER, userStr);
  }

  public getAuthUser(): any {
    let s = StorageService.get(StorageService.AUTH_USER);
    if (s) {
      const userStr = AESCryptoUtil.decryptUsingAES256(s);
      const tempUser: AuthUserModel = JSON.parse(userStr);
      return tempUser;
    }
    return null;
  }

  public clearAuthUser(): void {
    this.sharedService.setLoginUser(null);
    StorageService.clearStorage();
  }

  //endregion
}
