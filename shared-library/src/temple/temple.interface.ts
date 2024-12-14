import { IBaseAdminUser, ICommonTable } from '../base.interface';
import { IAddressDetail, IManageAddress } from '../location';

export interface IBaseTemple {
  templeName: string;
  description: string;
  addressId?: number;
  imagePath: object;
}

export interface IManageTemple extends IBaseTemple {
  templeId?: number;
  address: IManageAddress;
}

export interface ITemple extends IBaseTemple, ICommonTable {
  templeId: number;
  active: boolean;
}

export interface ITempleList extends ITemple {
  address: IAddressDetail;
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}

