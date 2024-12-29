import { IManageLegalPage, IMediaUpload } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class LegalPagesDto implements IManageLegalPage {
  @IsOptional()
  @IsNumber()
  legalPageId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  title: string;

  @IsNotEmpty()
  @IsString()
  details: string;

  @IsOptional()
  @IsArray()
  imagePath: IMediaUpload[];
}
