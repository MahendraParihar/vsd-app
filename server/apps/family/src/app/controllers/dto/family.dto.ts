import { IManageFamily, IMediaUpload } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class FamilyDto implements IManageFamily {
  @IsOptional()
  @IsNumber()
  familyId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  middleName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  emailId: string;

  @IsOptional()
  @IsArray()
  imagePath: IMediaUpload[];

  description: string;
  date: Date;
  time: Date;
  visitedCount: number;

}
