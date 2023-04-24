import moment from "moment";
import {IAdminShortInfo} from "./admin-user.interface";

export interface AdminUserListInterface {
  adminId: number;
  firstName: string;
  lastName: string;
  imagePath: string;
  emailId: string;
  contactNo: string;
  startDate: moment.Moment;
  endDate?: moment.Moment;
  adminUserStatusId: number;
  cityVillageId: number;
  cityVillage: string;
  createdBy: IAdminShortInfo;
  updatedBy: IAdminShortInfo;
  createdAt: string;
  updatedAt: string;
}
