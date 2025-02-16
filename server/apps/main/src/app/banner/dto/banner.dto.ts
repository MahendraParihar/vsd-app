import { IManageBanner, IMediaUpload, InputLength } from '@vsd-common/lib';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class BannerDto implements IManageBanner {
  @IsOptional()
  @IsNumber()
  bannerId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(InputLength.CHAR_100)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(InputLength.CHAR_200)
  subTitle: string;

  @IsOptional()
  @IsDateString()
  fromDate: Date;

  @IsOptional()
  @IsDateString()
  toDate?: Date;

  @IsOptional()
  @IsString()
  @MaxLength(InputLength.CHAR_200)
  url?: string;

  @IsOptional()
  @IsBoolean()
  isInternalUrl: boolean;

  @IsString()
  @IsNotEmpty()
  bannerFor: string;

  @IsNotEmpty()
  @IsArray()
  imagePath: IMediaUpload[];
}
