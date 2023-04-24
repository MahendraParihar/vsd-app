import {BasicSearchDto} from '../../../common-dto/basic-input.dto';
import {AddressBasicDto} from "../../../common-dto/address.dto";
import {IsDate, IsNotEmpty, MaxLength, MinLength} from "class-validator";
import {InputLength} from "../../../constants/input-length";
import {Type} from "class-transformer";
import {MediaUploadDto} from "../../../common-dto/media-upload.dto";

export class EventSearchDto extends BasicSearchDto {
  name?: string;
}

export class EventBasicDto {
  @IsNotEmpty()
  eventId: number;
}

export class EventAgendaDetailDto {
  @IsNotEmpty()
  startTime: string;

  endTime?: string;

  @IsNotEmpty()
  desc: string;
}

export class EventAgendaDto {
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  agendaDate: Date;

  @IsNotEmpty()
  agendaDetail: EventAgendaDetailDto[];
}

export class CreateEventDto {
  @IsNotEmpty()
  @MaxLength(InputLength.CHAR_100)
  @MinLength(InputLength.CHAR_5)
  title: string;

  @IsNotEmpty()
  description: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  time: string;

  @IsNotEmpty()
  address?: AddressBasicDto;

  @IsNotEmpty()
  agenda: EventAgendaDto[];

  @IsNotEmpty()
  uploadFiles: MediaUploadDto[];

  @IsNotEmpty()
  coordinator: string;
}
