import { IBaseAdminUser, ICommonTable } from "../base.interface";
import { IMediaUpload } from './media-upload.interface';

export interface IBaseLegalPage {
  title: string;
  details: string;
  imagePath: IMediaUpload[];
}

export interface IManageLegalPage extends IBaseLegalPage {
  legalPageId?: number;
}

export interface ILegalPage extends IBaseLegalPage, ICommonTable {
  legalPageId: number;
  active: boolean;
}

export interface ILegalPageList extends ILegalPage {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
