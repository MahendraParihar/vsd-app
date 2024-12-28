import { IManageCaste, IMediaUpload } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CasteDto implements IManageCaste {
  @IsOptional()
  @IsNumber()
  casteId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  caste: string;

  @IsOptional()
  @IsArray()
  imagePath: IMediaUpload[];

}
