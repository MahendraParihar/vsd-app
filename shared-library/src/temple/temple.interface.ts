import { IBaseAdminUser, ICommonSEO, ICommonTable } from '../base.interface';
import { IAddressDetail, IManageAddress } from '../location';
import { IMediaUpload } from '../core';

export interface IBaseTemple {
  templeName: string;
  description: string;
  addressId?: number;
  imagePath: IMediaUpload[];
}

export interface IManageTemple extends IBaseTemple, ICommonSEO {
  templeId?: number;
  address: IManageAddress;
}

export interface ITemple extends IBaseTemple, ICommonTable, ICommonSEO {
  templeId: number;
  active: boolean;
}

export interface ITempleList extends ITemple {
  address: IAddressDetail;
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}

