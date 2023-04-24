import {IAdminShortInfo} from "../response-interface/admin-user.interface";
import {IMediaUpload} from "../response-interface/media-upload.interface";

export class CommonFunctionsUtil {

  constructor() {

  }

  public static removeSpecialChar(tempStr: string): string {
    if (!tempStr) {
      return null;
    }
    return tempStr.replace(/ /g, "_");
  }

  public static getAdminShortInfo(obj: any, aliasString: string): IAdminShortInfo | null {
    if (!obj) {
      return null;
    }
    return <IAdminShortInfo>{
      adminId: obj.adminId,
      firstName: obj.firstName,
      lastName: obj.lastName,
      imagePath: obj.imagePath,
      cityVillage: obj.cityVillage,
      cityVillageId: obj.cityVillageId,
    };
  }


  public static getImagesObj(images: any): IMediaUpload[] {
    if (!images || images.length === 0) {
      return null;
    }
    const temp: IMediaUpload[] = [];
    if (images && images.length > 0) {
      for (const i of images) {
        temp.push(<IMediaUpload>i);
      }
    }
    return temp;
  }

}
