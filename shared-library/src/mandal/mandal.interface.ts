import { IBaseAdminUser, ICommonSEO, ICommonTable, ISocialLink } from '../base.interface';
import { IAddressDetail, IManageAddress } from '../location';
import { IMediaUpload } from '../core';

export interface IBaseMandal {
  mandalName: string;
  description: string;
  addressId?: number;
  imagePath: IMediaUpload[];
}

export interface IManageMandal extends IBaseMandal, ICommonSEO {
  mandalId?: number;
  address: IManageAddress;
  additionalInfo?: IMandalAdditionalInfo;
}

export interface IMandal extends IBaseMandal, ICommonTable, ICommonSEO {
  mandalId: number;
  active: boolean;
}

export interface IMandalList extends IMandal {
  address: IAddressDetail;
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}

export interface IMandalAdditionalInfo {
  regNo?: string;
  emailId?: string;
  phoneNumber?: string;
  socialSiteLink?: ISocialLink[];
}

export interface IMandalDetail extends IMandalList {
  additionalInfo?: IMandalAdditionalInfo;
}
