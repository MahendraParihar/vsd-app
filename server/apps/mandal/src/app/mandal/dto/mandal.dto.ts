import {IManageAddress, IManageMandal} from '@vsd-common/lib';
import {IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength} from 'class-validator';

export class MandalDto implements IManageMandal {
  @IsOptional()
  @IsNumber()
  mandalId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  mandalName: string;

  @IsOptional()
  @IsObject()
  imagePath: object;

  addressId: number;

  address: IManageAddress;

}
