import { IManageRaasi, IMediaUpload } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class RaasiDto implements IManageRaasi {
  @IsOptional()
  @IsNumber()
  raasiId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  raasi: string;

  @IsOptional()
  @IsArray()
  imagePath: IMediaUpload[];

}
