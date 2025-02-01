import { IManageMandal, IMediaUpload } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { AddressDto, MemberPostDto, SeoDto } from '@server/common';
import { Type } from 'class-transformer';

export class MandalDto extends SeoDto implements IManageMandal {
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
  imagePath: IMediaUpload[];

  @IsOptional()
  @IsNumber()
  addressId?: number;

  @IsNotEmpty()
  address: AddressDto;

  @IsNotEmpty()
  @IsArray()
  @Type(() => MemberPostDto)
  members: MemberPostDto[];

}
