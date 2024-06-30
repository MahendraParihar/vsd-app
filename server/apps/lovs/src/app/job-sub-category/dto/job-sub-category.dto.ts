import { IManageJobSubCategory } from '@vsd-common/lib';
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

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
  @IsObject()
  imagePath: object;

}
