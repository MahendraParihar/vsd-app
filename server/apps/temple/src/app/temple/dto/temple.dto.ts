import { IManageTemple } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { AddressDto } from '@server/common';

export class TempleDto implements IManageTemple {
  @IsOptional()
  @IsNumber()
  templeId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  templeName: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  imagePath: object;

  @IsOptional()
  @IsNumber()
  addressId?: number;

  @IsNotEmpty()
  address: AddressDto;
}
