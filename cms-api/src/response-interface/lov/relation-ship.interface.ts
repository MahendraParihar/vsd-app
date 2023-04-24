import {IAdminShortInfo} from "../admin-user.interface";

export interface RelationShipInterface {
  id: number;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: IAdminShortInfo;
  updatedBy: IAdminShortInfo;
}
