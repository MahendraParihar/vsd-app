import {IManageAddress, IManageTemple} from '@vsd-common/lib';
import {IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength} from 'class-validator';

export class TempleDto implements IManageTemple {
  @IsOptional()
  @IsNumber()
  templeId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  templeName: string;

  @IsOptional()
  @IsObject()
  imagePath: object;

  addressId: number;

  address: IManageAddress;
}
