import { IBaseAdminUser, ICommonTable } from "../base.interface";

export interface IBaseCountry {
  country: string;
  countryCode: string;
  phoneNumberCode: string;
}

export interface IManageCountry extends IBaseCountry {
  countryId?: number;
}

export interface ICountry extends IBaseCountry, ICommonTable {
  countryId: number;
  active: boolean;
}

export interface ICountryList extends ICountry {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}

export interface IBaseState {
  countryId: number;
  state: string;
  code: string;
}

export interface IManageState extends IBaseState {
  stateId?: number;
}

export interface IState extends IBaseState, ICommonTable {
  stateId: number;
  active: boolean;
}

export interface IStateList extends IState {
  country: string;
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}

export interface IBaseDistrict {
  stateId: number;
  district: string;
}

export interface IManageDistrict extends IBaseDistrict {
  districtId?: number;
}

export interface IDistrict extends IBaseDistrict, ICommonTable {
  districtId: number;
  active: boolean;
}

export interface IDistrictList extends IDistrict {
  state: string;
  country: string;
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}

export interface IBaseCityVillage {
  districtId: number;
  cityVillage: string;
  pinCode: string;
  stdCode: string;
}

export interface IManageCityVillage extends IBaseCityVillage {
  cityVillageId?: number;
}

export interface ICityVillage extends IBaseCityVillage, ICommonTable {
  cityVillageId: number;
  active: boolean;
}

export interface ICityVillageList extends ICityVillage {
  district: string;
  state: string;
  country: string;
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}

export interface IBaseAddress {
  address: string;
  pinCode: string;
  latitude: string;
  longitude: string;
  countryId: number;
  stateId: number;
  districtId: number;
  cityVillageId: number;
}

export interface IManageAddress extends IBaseAddress {
  addressId?: number;
  addressTypeId: number;
  active: boolean;
}

export interface IAddress extends IBaseAddress, ICommonTable {
  addressId: number;
  addressTypeId: number;
}

export interface IAddressList extends IAddress {
  district: IDistrict;
  state: IState;
  country: ICountry;
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
