import { IBaseAdminUser, ICommonTable } from "../base.interface";

export interface IBaseMediaSrc {
  mediaSrc: string;
}

export interface IManageMediaSrc extends IBaseMediaSrc {
  mediaSrcId?: number;
}

export interface IMediaSrc extends IBaseMediaSrc, ICommonTable {
  mediaSrcId: number;
  active: boolean;
}

export interface IMediaSrcList extends IMediaSrc {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
