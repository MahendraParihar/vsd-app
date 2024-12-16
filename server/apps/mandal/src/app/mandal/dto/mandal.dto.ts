import { IManageMandal } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { AddressDto } from '@server/common';

export class MandalDto implements IManageMandal {
  @IsOptional()
  @IsNumber()
  mandalId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  mandalName: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  imagePath: object[];

  @IsOptional()
  @IsNumber()
  addressId?: number;

  @IsNotEmpty()
  address: AddressDto;

}
