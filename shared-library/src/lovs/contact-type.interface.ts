import { IBaseAdminUser, ICommonTable } from "../base.interface";

export interface IBaseContactType {
  contactType: string;
  imagePath: object;
}

export interface IManageContactType extends IBaseContactType {
  contactTypeId?: number;
}

export interface IContactType extends IBaseContactType, ICommonTable {
  contactTypeId: number;
  active: boolean;
}

export interface IContactTypeList extends IContactType {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
