import { IManageMaritalStatus, IMediaUpload } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class MaritalStatusDto implements IManageMaritalStatus {
  @IsOptional()
  @IsNumber()
  maritalStatusId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  maritalStatus: string;

  @IsOptional()
  @IsArray()
  imagePath: IMediaUpload[];

}
