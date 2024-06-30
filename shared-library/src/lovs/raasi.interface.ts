import { IBaseAdminUser, ICommonTable } from "../base.interface";

export interface IBaseRaasi {
  raasi: string;
  imagePath: object;
}

export interface IManageRaasi extends IBaseRaasi {
  raasiId?: number;
}

export interface IRaasi extends IBaseRaasi, ICommonTable {
  raasiId: number;
  active: boolean;
}

export interface IRaasiList extends IRaasi {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
