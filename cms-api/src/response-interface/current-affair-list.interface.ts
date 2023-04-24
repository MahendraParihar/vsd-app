import {IAdminShortInfo} from "./admin-user.interface";

export interface CurrentAffairListInterface {
  currentAffairId: number;
  title: string;
  imagePath: string;
  date: string;
  time: string;
  visitedCount: number;
  active: boolean;
  createdBy: IAdminShortInfo;
  updatedBy: IAdminShortInfo;
  createdAt: string;
  updatedAt: string;
}
