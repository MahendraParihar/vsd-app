import { IManageCountry } from '@vsd-common/lib';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CountryDto implements IManageCountry {
  @IsOptional()
  @IsNumber()
  countryId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  country: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(5)
  countryCode: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(5)
  phoneNumberCode: string;

}
