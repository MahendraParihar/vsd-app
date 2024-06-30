import { IBaseAdminUser, ICommonTable } from "../base.interface";

export interface IBaseMediaType {
  mediaType: string;
}

export interface IManageMediaType extends IBaseMediaType {
  mediaTypeId?: number;
}

export interface IMediaType extends IBaseMediaType, ICommonTable {
  mediaTypeId: number;
  active: boolean;
}

export interface IMediaTypeList extends IMediaType {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
