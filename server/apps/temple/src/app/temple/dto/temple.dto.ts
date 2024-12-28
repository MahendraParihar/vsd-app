import { IManageTemple, IMediaUpload } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { AddressDto, SeoDto } from '@server/common';

export class TempleDto extends SeoDto implements IManageTemple {
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
  imagePath: IMediaUpload[];

  @IsOptional()
  @IsNumber()
  addressId?: number;

  @IsNotEmpty()
  address: AddressDto;
}
