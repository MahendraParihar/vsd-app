import {MediaUploadResponseModel} from "./media-upload-response.model";
import {AdminShortInfoModel} from "./admin-short-info.model";
import {AddressModel} from "./address.model";
import * as moment from "moment";
import {Constants} from "../constants/Constants";

export class FamilyModel {
  id: number;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  imagePath?: MediaUploadResponseModel[];
  emailId?: string;
  contactNo?: string;
  cityVillage?: string;
  cityVillageId?: number;
  active?: boolean;
  isApproved?: boolean;
  createdAt?: string;
  createdBy?: AdminShortInfoModel;
  updatedAt?: string;
  updatedBy?: AdminShortInfoModel;
  approvedBy?: AdminShortInfoModel;

  static fromJson(data: any): FamilyModel | null {
    if (!data) {
      return null;
    }
    const authUserObj: FamilyModel = new FamilyModel();
    authUserObj.id = data.familyId;
    authUserObj.firstName = data.firstName;
    authUserObj.middleName = data.middleName;
    authUserObj.lastName = data.lastName;
    authUserObj.emailId = data.emailId;
    authUserObj.contactNo = data.contactNo;
    authUserObj.cityVillage = data.cityVillage;
    authUserObj.cityVillageId = data.cityVillageId;
    authUserObj.imagePath = data.imagePath ? <MediaUploadResponseModel[]>data.imagePath : null;
    authUserObj.active = data.active;
    authUserObj.isApproved = data.isApproved;
    authUserObj.createdBy = AdminShortInfoModel.fromJson(data.createdBy);
    authUserObj.updatedBy = AdminShortInfoModel.fromJson(data.updatedBy);
    authUserObj.createdAt = data.createdAt;
    authUserObj.updatedAt = data.updatedAt;
    authUserObj.approvedBy = AdminShortInfoModel.fromJson(data.approvedBy);
    return authUserObj;
  }
}

export class FamilyProfileModel {
  familyId?: number;
  dateOfBirth?: moment.Moment;
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
  createdBy: AdminShortInfoModel;
  updatedBy: AdminShortInfoModel;
  createdAt: string;
  updatedAt: string;

  static fromJson(data: any): FamilyProfileModel {
    if (!data) {
      return null;
    }
    const tempObj: FamilyProfileModel = new FamilyProfileModel();
    tempObj.familyId = data['familyId'];
    tempObj.dateOfBirth = data['dateOfBirth'] ? moment(data['dateOfBirth'], Constants.DEFAULT_DATE_FORMAT):null;
    tempObj.height = data['height'];
    tempObj.weight = data['weight'];
    tempObj.genderId = data['genderId'];
    tempObj.maritalStatusId = data['maritalStatusId'];
    tempObj.religionId = data['religionId'];
    tempObj.casteId = data['casteId'];
    tempObj.gotraId = data['gotraId'];
    tempObj.raasiId = data['raasiId'];
    tempObj.gender = data['gender'];
    tempObj.maritalStatus = data['maritalStatus'];
    tempObj.religion = data['religion'];
    tempObj.caste = data['caste'];
    tempObj.gotra = data['gotra'];
    tempObj.raasi = data['raasi'];
    tempObj.isMaglik = data['isMaglik'];
    tempObj.description = data['description'];
    tempObj.hobbies = <string[]>data['hobbies'];
    tempObj.monthlyIncome = data['monthlyIncome'];
    tempObj.createdBy = AdminShortInfoModel.fromJson(data['createdBy']);
    tempObj.updatedBy = AdminShortInfoModel.fromJson(data['updatedBy']);
    tempObj.createdAt = data['createdAt'];
    tempObj.updatedAt = data['updatedAt'];
    return tempObj;
  }
}

export class FamilyBusinessModel {
  familyBusinessMappingId: number;
  familyId: number;
  familyBusinessId: number;
  businessId: number;
  business: string;
  websiteLink: string;
  contactNumber: string;
  emailId: string;
  bannerPath: MediaUploadResponseModel[];
  addressObj: AddressModel;
  active: boolean;
  createdBy: AdminShortInfoModel;
  updatedBy: AdminShortInfoModel;
  createdAt: string;
  updatedAt: string;

  static fromJson(data: any): FamilyBusinessModel {
    if (!data) {
      return null;
    }
    const tempObj: FamilyBusinessModel = new FamilyBusinessModel();

    tempObj.familyBusinessMappingId = data['familyBusinessMappingId'];
    tempObj.familyId = data['familyId'];
    tempObj.familyBusinessId = data['familyBusinessId'];
    tempObj.businessId = data['businessId'];
    tempObj.business = data['business'];
    tempObj.websiteLink = data['websiteLink'];
    tempObj.contactNumber = data['contactNumber'];
    tempObj.emailId = data['emailId'];
    tempObj.bannerPath = <MediaUploadResponseModel[]>data['bannerPath'];
    tempObj.addressObj = AddressModel.fromJson(data['addressObj']);

    tempObj.active = data['active'];
    tempObj.createdBy = AdminShortInfoModel.fromJson(data['createdBy']);
    tempObj.updatedBy = AdminShortInfoModel.fromJson(data['updatedBy']);
    tempObj.createdAt = data['createdAt'];
    tempObj.updatedAt = data['updatedAt'];
    return tempObj;
  }
}

export class FamilyServiceModel {
  familyServiceId: number;
  familyId: number;
  serviceId: number;
  service: string;
  imagePath: MediaUploadResponseModel[];
  jobProfile: string;
  jobDescription: string;
  active: boolean;
  createdBy: AdminShortInfoModel;
  updatedBy: AdminShortInfoModel;
  createdAt: string;
  updatedAt: string;

  static fromJson(data: any): FamilyServiceModel {
    if (!data) {
      return null;
    }
    const tempObj: FamilyServiceModel = new FamilyServiceModel();
    tempObj.familyServiceId = data['familyServiceId'];
    tempObj.familyId = data['familyId'];
    tempObj.serviceId = data['serviceId'];
    tempObj.service = data['service'];
    tempObj.imagePath = <MediaUploadResponseModel[]>data['imagePath'];
    tempObj.jobProfile = data['jobProfile'];
    tempObj.jobDescription = data['jobDescription'];
    tempObj.active = data['active'];
    tempObj.createdBy = AdminShortInfoModel.fromJson(data['createdBy']);
    tempObj.updatedBy = AdminShortInfoModel.fromJson(data['updatedBy']);
    tempObj.createdAt = data['createdAt'];
    tempObj.updatedAt = data['updatedAt'];
    return tempObj;
  }
}

export class FamilyAddictionModel {
  familyId: number;
  addictionId: number;
  addiction: string;
  active: boolean;
  createdBy: AdminShortInfoModel;
  updatedBy: AdminShortInfoModel;
  createdAt: string;
  updatedAt: string;

  static fromJson(data: any): FamilyAddictionModel {
    if (!data) {
      return null;
    }
    const tempObj: FamilyAddictionModel = new FamilyAddictionModel();
    tempObj.familyId = data['familyId'];
    tempObj.addictionId = data['addictionId'];
    tempObj.addiction = data['addiction'];
    tempObj.active = data['active'];
    tempObj.createdBy = AdminShortInfoModel.fromJson(data['createdBy']);
    tempObj.updatedBy = AdminShortInfoModel.fromJson(data['updatedBy']);
    tempObj.createdAt = data['createdAt'];
    tempObj.updatedAt = data['updatedAt'];
    return tempObj;
  }
}

export class FamilyEducationModel {
  familyId: number;
  educationDegreeId: number;
  educationDegree: string;
  scoredMarks: number;
  active: boolean;
  createdBy: AdminShortInfoModel;
  updatedBy: AdminShortInfoModel;
  createdAt: string;
  updatedAt: string;

  static fromJson(data: any): FamilyEducationModel {
    if (!data) {
      return null;
    }
    const tempObj: FamilyEducationModel = new FamilyEducationModel();
    tempObj.familyId = data['familyId'];
    tempObj.educationDegreeId = data['educationDegreeId'];
    tempObj.educationDegree = data['educationDegree'];
    tempObj.scoredMarks = data['scoredMarks'];
    tempObj.active = data['active'];
    tempObj.createdBy = AdminShortInfoModel.fromJson(data['createdBy']);
    tempObj.updatedBy = AdminShortInfoModel.fromJson(data['updatedBy']);
    tempObj.createdAt = data['createdAt'];
    tempObj.updatedAt = data['updatedAt'];
    return tempObj;
  }
}

export class FamilyContactNumberModel {
  id: number;
  familyId: number;
  countryCode: string;
  contactTypeId: number;
  contactType: string;
  contactNumber: string;
  active: boolean;
  createdBy: AdminShortInfoModel;
  updatedBy: AdminShortInfoModel;
  createdAt: string;
  updatedAt: string;

  static fromJson(data: any): FamilyContactNumberModel {
    if (!data) {
      return null;
    }
    const tempObj: FamilyContactNumberModel = new FamilyContactNumberModel();
    tempObj.id = data['familyContactNumberId'];
    tempObj.familyId = data['familyId'];
    tempObj.countryCode = data['countryCode'];
    tempObj.contactTypeId = data['contactTypeId'];
    tempObj.contactType = data['contactType'];
    tempObj.contactNumber = data['contactNumber'];
    tempObj.active = data['active'];
    tempObj.createdBy = AdminShortInfoModel.fromJson(data['createdBy']);
    tempObj.updatedBy = AdminShortInfoModel.fromJson(data['updatedBy']);
    tempObj.createdAt = data['createdAt'];
    tempObj.updatedAt = data['updatedAt'];
    return tempObj;
  }
}

export class FamilyDetailModel {
  familyObj: FamilyModel;
  profileObj: FamilyProfileModel;
  businessList: FamilyBusinessModel[];
  serviceList: FamilyServiceModel[];
  addictionList: FamilyAddictionModel[];
  educationList: FamilyEducationModel[];
  contactNumberList: FamilyContactNumberModel[];
  addressList: AddressModel[];

  static fromJson(data: any): FamilyDetailModel {
    const familyObj: FamilyDetailModel = new FamilyDetailModel();
    if (data['basic_info']) {
      familyObj.familyObj = FamilyModel.fromJson(data['basic_info']);
    }

    if (data['profile_info']) {
      familyObj.profileObj = FamilyProfileModel.fromJson(data['profile_info']);
    }

    if (data['addiction_info'] && data['addiction_info'].length > 0) {
      familyObj.addictionList = [];
      for (const s of data['addiction_info']) {
        familyObj.addictionList.push(FamilyAddictionModel.fromJson(s))
      }
    }

    if (data['education_info'] && data['education_info'].length > 0) {
      familyObj.educationList = [];
      for (const s of data['education_info']) {
        familyObj.educationList.push(FamilyEducationModel.fromJson(s));
      }
    }

    if (data['contact_number_info'] && data['contact_number_info'].length > 0) {
      familyObj.contactNumberList = [];
      for (const s of data['contact_number_info']) {
        familyObj.contactNumberList.push(FamilyContactNumberModel.fromJson(s));
      }
    }

    if (data['address_info'] && data['address_info'].length > 0) {
      familyObj.addressList = [];
      for (const s of data['address_info']) {
        familyObj.addressList.push(AddressModel.fromJson(s));
      }
    }

    if (data['business_info'] && data['business_info'].length > 0) {
      familyObj.businessList = [];
      for (const s of data['business_info']) {
        familyObj.businessList.push(FamilyBusinessModel.fromJson(s));
      }
    }

    if (data['service_info'] && data['service_info'].length > 0) {
      familyObj.serviceList = [];
      for (const s of data['service_info']) {
        familyObj.serviceList.push(FamilyServiceModel.fromJson(s));
      }
    }
    return familyObj;
  }
}
