import { IManageFaqCategory, IMediaUpload } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class FaqCategoryDto implements IManageFaqCategory {
  @IsOptional()
  @IsNumber()
  faqCategoryId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  faqCategory: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  url: string;

  @IsOptional()
  @IsArray()
  imagePath: IMediaUpload[];

}
