import {ApiUrlEnum} from "../enum/api-url-enum";
import * as moment from "moment";
import {MediaUploadResponseModel} from "./media-upload-response.model";

export class CurrentAffairModel {
  id?: number;
  title: string;
  description: string;
  date: moment.Moment;
  time: string;
  source: string;
  imagePath?: MediaUploadResponseModel[];
  commentsAllow?: boolean;
  isApproved?: boolean;
  active?: boolean;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;

  static fromJson(data: any): CurrentAffairModel | null {
    if (!data) {
      return null;
    }
    const authUserObj: CurrentAffairModel = new CurrentAffairModel();
    authUserObj.id = data.currentAffairId;
    authUserObj.title = data.title;
    authUserObj.description = data.description;
    authUserObj.source = data.source;
    authUserObj.date = data.date ? moment(data.date, 'YYYY:MM:DD') : null;
    authUserObj.time = data.time ? moment(data.time, 'hh:mm:ss').format('hh:mm A') : null;
    authUserObj.imagePath = data.imagePath ? (Array.isArray(data.imagePath) ? data.imagePath : [data.imagePath]) : [];
    authUserObj.commentsAllow = data.commentsAllow;
    authUserObj.isApproved = data.isApproved;
    authUserObj.active = data.active;
    authUserObj.createdBy = data.createdBy;
    authUserObj.updatedBy = data.updatedBy;
    authUserObj.createdAt = data.createdAt;
    authUserObj.updatedAt = data.updatedAt;
    return authUserObj;
  }
}
