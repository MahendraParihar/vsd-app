import { IBaseAdminUser, ICommonTable } from '../base.interface';
import { IMediaUpload } from '../core';
import { IAddressDetail, IManageAddress } from '../location';

export interface IBaseFamily {
  firstName: string;
  middleName: string;
  lastName: string;
  emailId: string;
  addressId?: number;
  imagePath?: IMediaUpload[];
}

export interface IManageFamily extends IBaseFamily {
  familyId?: number;
  address?: IManageAddress;
}

export interface IFamily extends IBaseFamily, ICommonTable {
  familyId: number;
  visitedCount: number;
  active: boolean;
}

export interface IFamilyList extends IFamily {
  address?: IAddressDetail;
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}

export interface IBaseFamilyProfile {
  familyId: number;
  genderId: number;
  maritalStatusId: number;
  dateOfBirth: Date;
  height: number;
  religionId: number;
  casteId?: number;
  gotraId: number;
  raasiId?: number;
  isMaglik: boolean;
  description?: string;
  hobbies?: string;
  monthlyIncome?: number;
}

export interface IManageFamilyProfile extends IBaseFamilyProfile {
  familyProfileId?: number;
  active: boolean;
}

export interface IFamilyProfile extends IBaseFamilyProfile, ICommonTable {
  familyProfileId: number;
}

export interface IFamilyProfileList extends IFamilyProfile {
  gender: string;
  maritalStatus?: string;
  religion: string;
  caste?: string;
  gotra: string;
  raasi?: string;
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
