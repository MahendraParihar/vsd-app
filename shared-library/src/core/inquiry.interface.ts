import { IBaseAdminUser } from '../base.interface';

export interface IInquiry {
  name: string;
  message: string;
  emailId: string;
  contactNumber: string;
}

export interface IInquiryDetails extends IInquiry {
  inquiryId: number;
  active: boolean;
  isResponded: boolean;
  createdIp: string;
  modifiedIp: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
}

export interface IInquiryList extends IInquiryDetails {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
