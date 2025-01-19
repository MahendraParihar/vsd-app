import { IEventAgenda, IEventAgendaDetail, IManageEvent, IMediaUpload, InputLength } from '@vsd-common/lib';
import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { AddressDto, SeoDto } from '@server/common';
import { Type } from 'class-transformer';

export class EventAgendaDetailDto implements IEventAgendaDetail {
  @IsString()
  @IsNotEmpty()
  @MaxLength(InputLength.CHAR_100)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(InputLength.CHAR_200)
  details: string;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsDateString()
  @IsNotEmpty()
  time: Date;
}

export class EventAgendaDto implements IEventAgenda {
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsArray()
  @Type(() => EventAgendaDto)
  details: EventAgendaDetailDto[];
}

export class EventDto extends SeoDto implements IManageEvent {
  @IsOptional()
  @IsNumber()
  eventId?: number;

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

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsString()
  time: Date;

  @IsOptional()
  @IsNumber()
  visitedCount: number;

  @IsNotEmpty()
  address: AddressDto;

  @IsArray()
  @Type(() => EventAgendaDto)
  agenda: EventAgendaDto[];
}
