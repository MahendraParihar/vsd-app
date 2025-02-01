import { IManageFacility, IMediaUpload, InputLength } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { AddressDto, MemberPostDto, SeoDto } from '@server/common';
import { Type } from 'class-transformer';

export class FacilityDto extends SeoDto implements IManageFacility {
  @IsOptional()
  @IsNumber()
  facilityId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(InputLength.CHAR_100)
  title: string;

  @IsOptional()
  @IsArray()
  imagePath: IMediaUpload[];

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  visitedCount: number;

  @IsNotEmpty()
  address: AddressDto;

  @IsNotEmpty()
  @IsArray()
  @Type(() => MemberPostDto)
  members: MemberPostDto[];
}
