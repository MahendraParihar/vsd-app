import {ApiUrlEnum} from "../enum/api-url-enum";

export class StateModel {
  id?: number;
  name?: string;
  imagePath?: string;
  countryId?: number;
  active?: boolean;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;

  static fromJson(data: any): StateModel | null {
    if (!data) {
      return null;
    }
    const authUserObj: StateModel = new StateModel();
    authUserObj.id = data.id;
    authUserObj.name = data.name;
    authUserObj.imagePath = data.imagePath ? ApiUrlEnum.BASE_IMAGE_URL + data.imagePath : '';
    authUserObj.active = data.active;
    authUserObj.countryId = data.parentId;
    authUserObj.createdBy = data.createdBy;
    authUserObj.updatedBy = data.updatedBy;
    authUserObj.createdAt = data.createdAt;
    authUserObj.updatedAt = data.updatedAt;
    return authUserObj;
  }
}
