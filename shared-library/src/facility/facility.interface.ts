import { IBaseAdminUser, ICommonSEO, ICommonTable } from '../base.interface';
import { IAddressDetail, IManageAddress } from '../location';
import { IMediaUpload, IMemberPost, IMemberPostInfo } from '../core';

export interface IBaseFacility {
  title: string;
  description: string;
  addressId?: number;
  imagePath: IMediaUpload[];
}

export interface IManageFacility extends IBaseFacility, ICommonSEO {
  facilityId?: number;
  address: IManageAddress;
  members: IMemberPost[];
}

export interface IFacility extends IBaseFacility, ICommonTable, ICommonSEO {
  facilityId: number;
  active: boolean;
}

export interface IFacilityList extends IFacility {
  address: IAddressDetail;
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}

export interface IFacilityDetail extends IFacilityList {
  facilityMembers: IMemberPostInfo[];
}

