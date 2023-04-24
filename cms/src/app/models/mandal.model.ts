import {AddressModel} from "./address.model";

export class MandalModel {
  mandalId?: number;
  mandal?: string;
  active?: boolean;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  addressModel?: AddressModel;

  static fromJson(data: any): MandalModel | null {
    if (!data) {
      return null;
    }
    const authUserObj: MandalModel = new MandalModel();
    authUserObj.mandalId = data.mandalId;
    authUserObj.mandal = data.mandal;
    authUserObj.active = data.active;
    authUserObj.createdBy = data.createdBy;
    authUserObj.updatedBy = data.updatedBy;
    authUserObj.createdAt = data.createdAt;
    authUserObj.updatedAt = data.updatedAt;
    authUserObj.addressModel = AddressModel.fromJson(data.address);
    return authUserObj;
  }
}
