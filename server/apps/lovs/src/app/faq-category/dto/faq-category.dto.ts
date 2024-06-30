import { IManageFaqCategory } from '@vsd-common/lib';
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

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
  @MaxLength(250)
  url: string;

  @IsOptional()
  @IsObject()
  imagePath: object;

}
