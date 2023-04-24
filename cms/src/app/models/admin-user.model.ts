import {ApiUrlEnum} from "../enum/api-url-enum";
import {MediaUploadResponseModel} from "./media-upload-response.model";
import * as moment from "moment";
import {Constants} from "../constants/Constants";
import {AdminShortInfoModel} from "./admin-short-info.model";

export class AdminUserModel {
  adminId?: number;
  firstName?: string;
  lastName?: string;
  password?: string;
  contactNo?: string;
  imagePath?: MediaUploadResponseModel[];
  emailId?: string;
  adminUserStatusId?: number;
  cityVillageId?: number;
  deactiveReason?: string;
  startDate?: moment.Moment;
  endDate?: moment.Moment;
  createdAt?: string;
  createdBy: AdminShortInfoModel;
  updatedBy: AdminShortInfoModel;
  updatedAt?: string;

  static fromJson(data: any): AdminUserModel | null {
    if (!data) {
      return null;
    }
    const authUserObj: AdminUserModel = new AdminUserModel();
    authUserObj.adminId = data.adminId;
    authUserObj.firstName = data.firstName;
    authUserObj.lastName = data.lastName;
    authUserObj.imagePath = data.imagePath ? <MediaUploadResponseModel[]>data.imagePath : null;
    authUserObj.emailId = data.emailId;
    authUserObj.contactNo = data.contactNo;
    authUserObj.cityVillageId = data.cityVillageId;
    authUserObj.adminUserStatusId = data.adminUserStatusId;
    authUserObj.startDate = data.startDate ? data.startDate : null;
    authUserObj.endDate = data.endDate ? data.endDate : null;
    authUserObj.deactiveReason = data.deactiveReason;
    authUserObj.createdBy = AdminShortInfoModel.fromJson(data['createdBy']);
    authUserObj.updatedBy = AdminShortInfoModel.fromJson(data['updatedBy']);
    authUserObj.createdAt = data.createdAt;
    authUserObj.updatedAt = data.updatedAt;
    return authUserObj;
  }
}
