import {IAdminShortInfo} from "./admin-user.interface";

export interface InquiryListInterface {
  id: number;
  name: string;
  emailId: string;
  message: string;
  responseText: string;
  isResponded: boolean;
  active: boolean;
  createdBy?: IAdminShortInfo;
  updatedBy?: IAdminShortInfo;
  createdAt: string;
  updatedAt: string;
}
