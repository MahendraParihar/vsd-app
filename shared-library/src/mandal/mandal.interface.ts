import { IBaseAdminUser, ICommonTable } from "../base.interface";
import { IAddressList, IManageAddress } from "../location";

export interface IBaseMandal {
  mandalName: string;
  addressId: number;
  imagePath: object;
}

export interface IManageMandal extends IBaseMandal {
  mandalId?: number;
  address: IManageAddress;
}

export interface IMandal extends IBaseMandal, ICommonTable {
  mandalId: number;
  active: boolean;
}

export interface IMandalList extends IMandal {
  address: IAddressList;
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
