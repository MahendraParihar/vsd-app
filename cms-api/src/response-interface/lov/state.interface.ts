import {IAdminShortInfo} from "../admin-user.interface";

export interface StateInterface {
  id: number;
  name: string;
  stateCode?: string;
  countryId: number;
  country?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: IAdminShortInfo;
  updatedBy: IAdminShortInfo;
}
