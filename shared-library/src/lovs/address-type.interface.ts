import { IBaseAdminUser, ICommonTable } from "../base.interface";
import { IMediaUpload } from '../core';

export interface IBaseAddressType {
  addressType: string;
  imagePath: IMediaUpload[];
}

export interface IManageAddressType extends IBaseAddressType {
  addressTypeId?: number;
}

export interface IAddressType extends IBaseAddressType, ICommonTable {
  addressTypeId: number;
  active: boolean;
}

export interface IAddressTypeList extends IAddressType {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
