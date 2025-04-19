import { IInquiry, InputLength } from '@vsd-common/lib';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class InquiryDto implements IInquiry {
  @IsNotEmpty()
  @IsString()
  @MaxLength(InputLength.CHAR_100)
  name: string;

  @IsNotEmpty()
  @IsString()
  emailId: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  contactNumber: string;

  @IsNotEmpty()
  @IsString()
  recaptcha: string;
}
