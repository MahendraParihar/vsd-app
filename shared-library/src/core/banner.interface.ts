import { IBaseAdminUser, ICommonTable } from '../base.interface';
import { IMediaUpload } from '../core';

export interface IBaseBanner {
  title: string;
  subTitle: string;
  fromDate: Date;
  toDate?: Date;
  url?: string;
  isInternalUrl: boolean;
  bannerFor: string;
  imagePath: IMediaUpload;
}

export interface IManageBanner extends IBaseBanner {
  bannerId?: number;
}

export interface IBanner extends IBaseBanner, ICommonTable {
  bannerId: number;
  active: boolean;
}

export interface IBannerList extends IBanner {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
