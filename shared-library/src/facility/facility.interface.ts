import { IBaseAdminUser, ICommonSEO, ICommonTable } from '../base.interface';
import { IAddressDetail, IManageAddress } from '../location';
import { IMediaUpload } from '../core';

export interface IBaseFacility {
  title: string;
  description: string;
  addressId?: number;
  imagePath: IMediaUpload[];
}

export interface IManageFacility extends IBaseFacility, ICommonSEO {
  facilityId?: number;
  address: IManageAddress;
}

export interface IFacility extends IBaseFacility, ICommonTable, ICommonSEO {
  templeId: number;
  active: boolean;
}

export interface IFacilityList extends IFacility {
  address: IAddressDetail;
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}

