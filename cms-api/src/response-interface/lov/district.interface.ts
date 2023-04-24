import {IAdminShortInfo} from "../admin-user.interface";

export interface DistrictInterface {
  id: number;
  name: string;
  country?: string;
  state?: string;
  countryId?: number;
  stateId?: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: IAdminShortInfo;
  updatedBy: IAdminShortInfo;
}
