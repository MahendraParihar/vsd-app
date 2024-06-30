import { IManageMaritalStatus } from '@vsd-common/lib';
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class MaritalStatusDto implements IManageMaritalStatus {
  @IsOptional()
  @IsNumber()
  maritalStatusId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  maritalStatus: string;

  @IsOptional()
  @IsObject()
  imagePath: object;

}
