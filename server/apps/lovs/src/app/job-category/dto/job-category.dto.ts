import { IManageJobCategory } from '@vsd-common/lib';
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class JobCategoryDto implements IManageJobCategory {
  @IsOptional()
  @IsNumber()
  jobCategoryId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  jobCategory: string;

  @IsOptional()
  @IsObject()
  imagePath: object;

}
