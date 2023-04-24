import {ApiUrlEnum} from "../enum/api-url-enum";

export class MandalMemberModel {
  imagePath?: string;
  active?: boolean;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;

  static fromJson(data: any): MandalMemberModel | null {
    if (!data) {
      return null;
    }
    const authUserObj: MandalMemberModel = new MandalMemberModel();
    authUserObj.imagePath = data.imagePath ? ApiUrlEnum.BASE_IMAGE_URL + data.imagePath : '';
    authUserObj.active = data.active;
    authUserObj.createdBy = data.createdBy;
    authUserObj.updatedBy = data.updatedBy;
    authUserObj.createdAt = data.createdAt;
    authUserObj.updatedAt = data.updatedAt;
    return authUserObj;
  }
}
