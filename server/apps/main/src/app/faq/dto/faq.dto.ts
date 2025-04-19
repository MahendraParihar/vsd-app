import { IManageFaq, InputLength } from '@vsd-common/lib';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class FaqDto implements IManageFaq {
  @IsOptional()
  @IsNumber()
  faqId?: number;

  @IsNotEmpty()
  @IsNumber()
  faqCategoryId: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(InputLength.CHAR_500)
  faq: string;

  @IsNotEmpty()
  @IsString()
  answer: string;
}
