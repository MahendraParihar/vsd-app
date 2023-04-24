import {IAdminShortInfo} from "../admin-user.interface";

export interface CountryInterface {
  id: number;
  name: string;
  countryCode: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: IAdminShortInfo;
  updatedBy: IAdminShortInfo;
}
