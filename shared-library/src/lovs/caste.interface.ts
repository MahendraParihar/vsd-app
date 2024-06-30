import { IBaseAdminUser, ICommonTable } from "../base.interface";

export interface IBaseCaste {
  caste: string;
  imagePath: object;
}

export interface IManageCaste extends IBaseCaste {
  casteId?: number;
}

export interface ICaste extends IBaseCaste, ICommonTable {
  casteId: number;
  active: boolean;
}

export interface ICasteList extends ICaste {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
