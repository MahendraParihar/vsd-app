import { IBaseAdminUser, ICommonTable } from '../base.interface';
import { IAddressDetail, IManageAddress } from '../location';

export interface IBaseMandal {
  mandalName: string;
  description: string;
  addressId?: number;
  imagePath: object;
}

export interface IManageMandal extends IBaseMandal {
  mandalId?: number;
  address: IManageAddress;
}

export interface IMandal extends IBaseMandal, ICommonTable {
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
  socialSiteLink?: { label: string, link: string, icon: string }[];
}

export interface IMandalDetail extends IMandalList {
  additionalInfo?: IMandalAdditionalInfo;
}
