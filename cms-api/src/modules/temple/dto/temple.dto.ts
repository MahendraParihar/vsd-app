import {BasicSearchDto} from "../../../common-dto/basic-input.dto";
import {IsNotEmpty, MaxLength, MinLength} from "class-validator";
import {InputLength} from "../../../constants/input-length";
import {AddressBasicDto} from "../../../common-dto/address.dto";
import {MediaUploadDto} from "../../../common-dto/media-upload.dto";

export class TempleSearchDto extends BasicSearchDto {
  name?: string;
}

export class CreateTempleDto {
  @IsNotEmpty()
  @MaxLength(InputLength.CHAR_100)
  @MinLength(InputLength.CHAR_5)
  templeName: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  address?: AddressBasicDto;

  @IsNotEmpty()
  uploadFiles: MediaUploadDto[];
}
