import { InputLength } from '@vsd-common/lib';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class InquiryDto {
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
}
