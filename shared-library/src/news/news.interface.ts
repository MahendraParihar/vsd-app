import { IBaseAdminUser, ICommonTable } from '../base.interface';

export interface IBaseNews {
  title: string;
  description: string;
  date: Date;
  time: Date;
  isApproved: boolean;
  commentApplicable: boolean;
  tags: string[];
  visitedCount: number;
  imagePath: object;
  approvedBy: number;
}

export interface IManageNews extends IBaseNews {
  currentAffairId?: number;
}

export interface INews extends IBaseNews, ICommonTable {
  currentAffairId: number;
  active: boolean;
}

export interface INewsList extends INews {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
  approvedByUser: IBaseAdminUser;
}
