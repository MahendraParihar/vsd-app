import { IManageEvent, IManageAddress } from '@vsd-common/lib';
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';
import { SeoDto } from '@server/common';

export class EventDto extends SeoDto implements IManageEvent {
  @IsOptional()
  @IsNumber()
  eventId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  title: string;

  @IsOptional()
  @IsObject()
  imagePath: object;

  description: string;
  date: Date;
  time: Date;
  visitedCount: number;

  address: IManageAddress;
}
