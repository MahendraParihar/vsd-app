import {IsBoolean, IsDate, IsJSON, IsNotEmpty, IsNumber, MaxLength, MinLength} from "class-validator";
import {BasicSearchDto} from "../../../common-dto/basic-input.dto";
import {InputLength} from "../../../constants/input-length";
import {AddressBasicDto} from "../../../common-dto/address.dto";
import {Type} from "class-transformer";
import {MediaUploadDto} from "../../../common-dto/media-upload.dto";
import {ARRAY, JSONB} from "sequelize";

export class FamilySearchDto extends BasicSearchDto {
  title: string;
  fromDate: Date;
  toDate: Date;
}

export class FamilyBasicDto extends AddressBasicDto {
  @IsNotEmpty()
  familyId: number;
}

export class CreateFamilyDto {
  @IsNotEmpty()
  @MaxLength(InputLength.MAX_NAME)
  @MinLength(InputLength.MIN_NAME)
  firstName: string;

  @IsNotEmpty()
  @MaxLength(InputLength.MAX_NAME)
  @MinLength(InputLength.MIN_NAME)
  middleName: string;

  @IsNotEmpty()
  @MaxLength(InputLength.MAX_NAME)
  @MinLength(InputLength.MIN_NAME)
  lastName: string;

  @IsNotEmpty()
  // @IsEmail()
  @MaxLength(InputLength.MAX_EMAIL)
  emailId: string;

  @IsNotEmpty()
  @MaxLength(InputLength.MAX_CONTACT_NUMBER)
  contactNo: string;

  @IsNotEmpty()
  @IsNumber()
  familyCityVillageId: number;

  @IsNotEmpty()
  uploadFiles: MediaUploadDto[];

  @IsNumber()
  maritalStatusId?: number = null;

  @IsNumber()
  genderId?: number = null;

  @IsNumber()
  gotraId?: number = null;

  @IsDate()
  dateOfBirth?: Date = null;

  @IsNumber()
  height?: number = null;

  @IsNumber()
  weight?: number = null;

  @IsNumber()
  religionId?: number = null;

  @IsNumber()
  casteId?: number = null;

  @IsNumber()
  raasiId?: number = null;

  @IsBoolean()
  isMaglik?: boolean = null;

  @MaxLength(InputLength.MAX_PROFILE_DESCRIPTION)
  description?: string = null;

  @MaxLength(InputLength.CHAR_1000)
  hobbies?: string = null;

  @IsNumber()
  monthlyIncome?: string = null;
}

export class FamilyContactNumberDto {
  familyContactNumberId?: number;

  @IsNotEmpty()
  familyId: number;

  @IsNotEmpty()
  @MaxLength(InputLength.MAX_CONTACT_NUMBER)
  contactNumber: string;

  @IsNotEmpty()
  countryCode: string;

  @IsNotEmpty()
  contactTypeId: number;
}
