import { IManageEvent, IMediaUpload } from '@vsd-common/lib';
import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { AddressDto, SeoDto } from '@server/common';

export class EventDto extends SeoDto implements IManageEvent {
  @IsOptional()
  @IsNumber()
  eventId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  title: string;

  @IsOptional()
  @IsArray()
  imagePath: IMediaUpload[];

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsDateString()
  time: Date;

  @IsOptional()
  @IsNumber()
  visitedCount: number;

  @IsNotEmpty()
  address: AddressDto;
}
