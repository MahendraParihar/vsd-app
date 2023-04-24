import {IAdminShortInfo} from "./admin-user.interface";
import {IAddress} from "./address.interface";
import {IMediaUpload} from "./media-upload.interface";

export interface IFamilyList {
  familyId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  imagePath: IMediaUpload[];
  cityVillageId: number;
  cityVillage: string;
  emailId: string;
  contactNo: string;
  active: boolean;
  isApproved: boolean;
  approvedBy?: IAdminShortInfo;
  createdBy: IAdminShortInfo;
  updatedBy: IAdminShortInfo;
  createdAt: string;
  updatedAt: string;
}

export interface FamilyProfileInterface {
  familyId?: number;
  dateOfBirth?: string;
  height?: number;
  weight?: number;
  genderId?: number;
  maritalStatusId?: number;
  religionId?: number;
  casteId?: number;
  gotraId?: number;
  raasiId?: number;
  gender?: string;
  maritalStatus?: string;
  religion?: string;
  caste?: string;
  gotra?: string;
  raasi?: string;
  isMaglik?: boolean;
  description?: string;
  hobbies?: string[];
  monthlyIncome?: number;
  approvedBy?: string;
  createdBy: IAdminShortInfo;
  updatedBy: IAdminShortInfo;
  createdAt: string;
  updatedAt: string;
}

export interface IFamilyAddiction {
  familyId: number;
  addictionId: number;
  addiction: string;
  active: boolean;
  createdBy: IAdminShortInfo;
  updatedBy: IAdminShortInfo;
  createdAt: string;
  updatedAt: string;
}

export interface IFamilyEducation {
  familyId: number;
  educationDegreeId: number;
  educationDegree: string;
  scoredMarks: number;
  active: boolean;
  createdBy: IAdminShortInfo;
  updatedBy: IAdminShortInfo;
  createdAt: string;
  updatedAt: string;
}

export interface IFamilyContactDetail {
  familyContactNumberId: number;
  familyId: number;
  countryCode: string;
  contactTypeId: number;
  contactType: string;
  contactNumber: string;
  active: boolean;
  createdBy: IAdminShortInfo;
  updatedBy: IAdminShortInfo;
  createdAt: string;
  updatedAt: string;
}

export interface IFamilyBusiness {
  familyBusinessMappingId: number;
  familyId: number;
  familyBusinessId: number;
  businessId: number;
  business: string;
  websiteLink: string;
  contactNumber: string;
  emailId: string;
  bannerPath: IMediaUpload[];
  addressObj: IAddress;
  active: boolean;
  createdBy: IAdminShortInfo;
  updatedBy: IAdminShortInfo;
  createdAt: string;
  updatedAt: string;
}

export interface IFamilyService {
  familyServiceId: number;
  familyId: number;
  serviceId: number;
  service: string;
  imagePath: IMediaUpload[];
  jobProfile: string;
  jobDescription: string;
  active: boolean;
  createdBy: IAdminShortInfo;
  updatedBy: IAdminShortInfo;
  createdAt: string;
  updatedAt: string;
}
