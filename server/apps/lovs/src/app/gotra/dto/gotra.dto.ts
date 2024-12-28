import { IManageGotra, IMediaUpload } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class GotraDto implements IManageGotra {
  @IsOptional()
  @IsNumber()
  gotraId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  gotra: string;

  @IsOptional()
  @IsArray()
  imagePath: IMediaUpload[];

}
