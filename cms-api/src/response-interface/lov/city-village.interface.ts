import {IAdminShortInfo} from "../admin-user.interface";

export interface CityVillageInterface {
  id: number;
  name: string;
  districtId?: number;
  district?: string;
  stateId?: number;
  state?: string;
  countryId?: number;
  country?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: IAdminShortInfo;
  updatedBy: IAdminShortInfo;
}
