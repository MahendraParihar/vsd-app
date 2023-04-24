import {ApiUrlEnum} from "../enum/api-url-enum";

export class CityVillageModel {
  id?: number;
  name?: string;
  district?: string;
  state?: string;
  country?: string;
  districtId?: number;
  imagePath?: string;
  active?: boolean;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;

  static fromJson(data: any): CityVillageModel | null {
    if (!data) {
      return null;
    }
    const authUserObj: CityVillageModel = new CityVillageModel();
    authUserObj.id = data.id;
    authUserObj.imagePath = data.imagePath ? ApiUrlEnum.BASE_IMAGE_URL + data.imagePath : '';
    authUserObj.active = data.active;
    authUserObj.name = data.name;
    authUserObj.district = data.district;
    authUserObj.districtId = data.parentId;
    authUserObj.state = data.state;
    authUserObj.country = data.country;
    authUserObj.createdBy = data.createdBy;
    authUserObj.updatedBy = data.updatedBy;
    authUserObj.createdAt = data.createdAt;
    authUserObj.updatedAt = data.updatedAt;
    return authUserObj;
  }
}
