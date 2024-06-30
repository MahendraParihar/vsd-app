import { IBaseAdminUser, ICommonTable } from "../base.interface";

export interface IBaseLegalPage {
  title: string;
  details: string;
}

export interface IManageLegalPage extends IBaseLegalPage {
  legalPageId?: number;
  active: boolean;
}

export interface ILegalPage extends IBaseLegalPage, ICommonTable {
  legalPageId: number;
}

export interface ILegalPageList extends ILegalPage {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
