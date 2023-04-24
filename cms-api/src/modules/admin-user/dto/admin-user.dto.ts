import {IsDate, IsNotEmpty, MaxLength, MinLength} from 'class-validator';
import {BasicSearchDto} from '../../../common-dto/basic-input.dto';
import {InputLength} from "../../../constants/input-length";

export class AdminUserSearchDto extends BasicSearchDto {
  firstName?: string;
  lastName?: string;
  contactNumber?: string;
  emailId?: string;
  active?: boolean = true;
  startDate?: Date;
  endDate?: Date;
  fromDate?: Date;
  toDate?: Date;
  statusId?: number;
}

export class AdminUserBasicDto {
  @IsNotEmpty()
  adminId: number;
}

export class AdminUserUpdateStatusDto extends AdminUserBasicDto {
  @IsNotEmpty()
  statusId: number;

  @IsNotEmpty()
  reason: string;
}

export class AdminUserDto extends AdminUserUpdateStatusDto {
  @IsNotEmpty()
  @MaxLength(InputLength.MAX_NAME)
  @MinLength(InputLength.MIN_NAME)
  firstName: string;

  @IsNotEmpty()
  @MaxLength(InputLength.MAX_NAME)
  @MinLength(InputLength.MIN_NAME)
  lastName: string;

  @IsNotEmpty()
  @MaxLength(InputLength.MAX_EMAIL)
  emailId: string;

  @IsNotEmpty()
  @MaxLength(InputLength.MAX_CONTACT_NUMBER)
  @MinLength(InputLength.MAX_CONTACT_NUMBER)
  contactNo: string;

  @IsNotEmpty()
  cityVillageId: number;

  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsDate()
  endDate?: Date = null;
}
