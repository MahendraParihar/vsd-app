import {MediaUploadResponseModel} from "./media-upload-response.model";
import {AddressModel} from "./address.model";

export class TempleModel {
  id?: number;
  name?: string;
  description?: string;
  imagePath?: MediaUploadResponseModel[];
  active?: boolean;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  addressModel?: AddressModel;

  static fromJson(data: any): TempleModel | null {
    if (!data) {
      return null;
    }
    const authUserObj: TempleModel = new TempleModel();
    authUserObj.id = data.templeId;
    authUserObj.name = data.templeName;
    authUserObj.description = data.description;
    authUserObj.imagePath = data.imagePath ? (Array.isArray(data.imagePath) ? data.imagePath : [data.imagePath]) : [];
    authUserObj.active = data.active;
    authUserObj.createdBy = data.createdBy;
    authUserObj.updatedBy = data.updatedBy;
    authUserObj.createdAt = data.createdAt;
    authUserObj.updatedAt = data.updatedAt;
    authUserObj.addressModel = AddressModel.fromJson(data.address);
    return authUserObj;
  }
}
