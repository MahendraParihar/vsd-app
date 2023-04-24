import {ApiUrlEnum} from "../enum/api-url-enum";

export class DistrictModel {
  id?: number;
  name?: string;
  state?: string;
  country?: string;
  stateId?: number;
  imagePath?: string;
  active?: boolean;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;

  static fromJson(data: any): DistrictModel | null {
    if (!data) {
      return null;
    }
    const authUserObj: DistrictModel = new DistrictModel();
    authUserObj.id = data.id;
    authUserObj.imagePath = data.imagePath ? ApiUrlEnum.BASE_IMAGE_URL + data.imagePath : '';
    authUserObj.name = data.name;
    authUserObj.state = data.state;
    authUserObj.country = data.country;
    authUserObj.stateId = data.parentId;
    authUserObj.active = data.active;
    authUserObj.createdBy = data.createdBy;
    authUserObj.updatedBy = data.updatedBy;
    authUserObj.createdAt = data.createdAt;
    authUserObj.updatedAt = data.updatedAt;
    return authUserObj;
  }
}
