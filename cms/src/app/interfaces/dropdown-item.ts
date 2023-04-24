import {MediaUploadResponseModel} from "../models/media-upload-response.model";

export interface DropdownItem {
  id: any;
  name: string;
  isSelected: boolean;
  parentId?: number;
}

export interface MultiTextDropdownItem {
  id: string;
  name: string;
  imagePath: string;
  subText: string;
  isSelected: boolean;
  parentId?: number;
}

export interface UserDropdownItem {
  id: string;
  name: string;
  imagePath?: MediaUploadResponseModel[];
  subText: string;
  isSelected: boolean;
  parentId?: number;
}
