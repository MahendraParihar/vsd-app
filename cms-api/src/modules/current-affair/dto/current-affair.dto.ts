import {BasicSearchDto} from '../../../common-dto/basic-input.dto';
import {IsDate, IsNotEmpty, MaxLength, MinLength} from "class-validator";
import {InputLength} from "../../../constants/input-length";
import {MediaUploadDto} from "../../../common-dto/media-upload.dto";
import {Type} from "class-transformer";

export class CurrentAffairSearchDto extends BasicSearchDto {
  name?: string;
}

export class CreateCurrentAffairDto {
  @IsNotEmpty()
  @MaxLength(InputLength.CHAR_100)
  @MinLength(InputLength.CHAR_5)
  title: string;

  @IsNotEmpty()
  description: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  time: string;

  @IsNotEmpty()
  commentsAllow: boolean;

  @IsNotEmpty()
  uploadFiles: MediaUploadDto[];

  @MaxLength(InputLength.CHAR_200)
  @MinLength(InputLength.CHAR_5)
  source: string;
}
