import {IsNotEmpty, MaxLength, MinLength} from 'class-validator';
import {InputLength} from "../constants/input-length";

export class AddressBasicDto {

  @IsNotEmpty()
  @MaxLength(InputLength.MAX_ADDRESS)
  @MinLength(InputLength.MIN_ADDRESS)
  address: string;

  @IsNotEmpty()
  countryId: number;

  @IsNotEmpty()
  stateId: number;

  @IsNotEmpty()
  districtId: number;

  @IsNotEmpty()
  cityVillageId: number;

  @IsNotEmpty()
  @MaxLength(InputLength.PIN_CODE)
  @MinLength(InputLength.PIN_CODE)
  pinCode: string;

  addressTypeId: number;

  latitude?: number;
  longitude?: number;
}

export class AddressDto extends AddressBasicDto {

  @IsNotEmpty()
  tableId: number;

  @IsNotEmpty()
  pkOfTable: number;
}
