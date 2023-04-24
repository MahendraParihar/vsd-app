import {BasicSearchDto} from "../../../common-dto/basic-input.dto";
import {IsNotEmpty, MaxLength, MinLength} from "class-validator";
import {InputLength} from "../../../constants/input-length";
import {AddressBasicDto} from "../../../common-dto/address.dto";

export class MandalSearchDto extends BasicSearchDto {
  name?: string;
}

export class CreateMandalDto {
  @IsNotEmpty()
  @MaxLength(InputLength.CHAR_100)
  @MinLength(InputLength.CHAR_5)
  mandal: string;

  @IsNotEmpty()
  address?: AddressBasicDto;
}
