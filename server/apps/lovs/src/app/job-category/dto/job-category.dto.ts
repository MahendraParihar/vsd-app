import { IManageJobCategory, IMediaUpload } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class JobCategoryDto implements IManageJobCategory {
  @IsOptional()
  @IsNumber()
  jobCategoryId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  jobCategory: string;

  @IsOptional()
  @IsArray()
  imagePath: IMediaUpload[];

}
