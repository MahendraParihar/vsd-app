import { IManageJobSubCategory, IMediaUpload } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class JobSubCategoryDto implements IManageJobSubCategory {
  @IsOptional()
  @IsNumber()
  jobSubCategoryId?: number;

  @IsNotEmpty()
  @IsNumber()
  jobCategoryId: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  jobSubCategory: string;

  @IsOptional()
  @IsArray()
  imagePath: IMediaUpload[];

}
