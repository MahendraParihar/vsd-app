import { IManageAddress } from '@vsd-common/lib';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { InputLength } from '@vsd-common/lib';

export class AddressDto implements IManageAddress {
  @IsNumber()
  @IsOptional()
  addressId?: number;

  @IsNumber()
  @IsNotEmpty()
  addressTypeId: number;

  @IsOptional()
  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  @IsString()
  @MaxLength(InputLength.MAX_ADDRESS)
  address: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(InputLength.CHAR_10)
  pinCode: string;

  @IsString()
  @IsOptional()
  @MaxLength(InputLength.CHAR_50)
  latitude: string;

  @IsString()
  @IsOptional()
  @MaxLength(InputLength.CHAR_50)
  longitude: string;

  @IsNumber()
  @IsNotEmpty()
  countryId: number;

  @IsNumber()
  @IsNotEmpty()
  stateId: number;

  @IsNumber()
  @IsNotEmpty()
  districtId: number;

  @IsNumber()
  @IsNotEmpty()
  cityVillageId: number;
}
