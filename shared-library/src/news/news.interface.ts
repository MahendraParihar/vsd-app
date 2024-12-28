import { IBaseAdminUser, ICommonSEO, ICommonTable } from '../base.interface';
import { IMediaUpload } from '../core';

export interface IBaseNews {
  title: string;
  description: string;
  date: Date;
  time: Date;
  isApproved: boolean;
  commentApplicable: boolean;
  visitedCount: number;
  imagePath: IMediaUpload[];
  approvedBy: number;
}

export interface IManageNews extends IBaseNews, ICommonSEO {
  currentAffairId?: number;
}

export interface INews extends IBaseNews, ICommonTable, ICommonSEO {
  currentAffairId: number;
  active: boolean;
}

export interface INewsList extends INews {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
  approvedByUser: IBaseAdminUser;
}
