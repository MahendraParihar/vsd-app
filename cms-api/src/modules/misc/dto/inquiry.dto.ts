import {IsEmail, MaxLength, MinLength} from 'class-validator';
import {BasicSearchDto} from "../../../common-dto/basic-input.dto";

export class InquirySearchDto extends BasicSearchDto {
  name?: string;
  categoryIds?: string;
}

export class CreateInquiryDto {
  readonly appUserId: number;

  @MinLength(2)
  @MaxLength(100)
  readonly name: string;

  @MaxLength(250)
  @IsEmail()
  readonly emailId: string;

  @MaxLength(16)
  readonly contactNumber: string;

  @MaxLength(500)
  @MinLength(5)
  readonly message: string;
}