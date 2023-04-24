import {ApiUrlEnum} from "../enum/api-url-enum";

export class CountryModel {
  id?: number;
  name?: string;
  countryCode?: string;
  imagePath?: string;
  active?: boolean;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;

  static fromJson(data: any): CountryModel | null {
    if (!data) {
      return null;
    }
    const authUserObj: CountryModel = new CountryModel();
    authUserObj.id = data.id;
    authUserObj.name = data.name;
    authUserObj.countryCode = data.countryCode;
    authUserObj.imagePath = data.imagePath ? ApiUrlEnum.BASE_IMAGE_URL + data.imagePath : '';
    authUserObj.active = data.active;
    authUserObj.createdBy = data.createdBy;
    authUserObj.updatedBy = data.updatedBy;
    authUserObj.createdAt = data.createdAt;
    authUserObj.updatedAt = data.updatedAt;
    return authUserObj;
  }
}
