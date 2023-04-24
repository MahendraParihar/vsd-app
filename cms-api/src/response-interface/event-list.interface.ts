import {IAdminShortInfo} from "./admin-user.interface";
import {IMediaUpload} from "./media-upload.interface";
import * as moment from "moment";

export interface EventListInterface {
  eventId: number;
  title: string;
  imagePath: IMediaUpload[];
  date: moment.Moment;
  time: moment.Moment;
  urlPath: string;
  visitedCount: number;
  location?: string;
  active: boolean;
  isPublished: boolean;
  createdBy: IAdminShortInfo;
  updatedBy: IAdminShortInfo;
  createdAt: moment.Moment;
  updatedAt: moment.Moment;
}
