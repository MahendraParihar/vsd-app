import { IManageFamily, IMediaUpload, InputLength } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class FamilyDto implements IManageFamily {
  @IsOptional()
  @IsNumber()
  familyId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(InputLength.CHAR_50)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(InputLength.CHAR_50)
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(InputLength.CHAR_50)
  middleName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(InputLength.CHAR_100)
  emailId: string;

  @IsOptional()
  @IsArray()
  imagePath: IMediaUpload[];
}
