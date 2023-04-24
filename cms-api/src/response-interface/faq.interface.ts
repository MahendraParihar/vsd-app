import {IAdminShortInfo} from "./admin-user.interface";

export interface FaqInterfaceList {
  id: number;
  faq: string;
  answer: string;
  active: boolean;
  createdBy: IAdminShortInfo;
  updatedBy: IAdminShortInfo;
  createdAt: string;
  updatedAt: string;
}
