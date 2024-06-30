import { IManageJobType } from '@vsd-common/lib';
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class JobTypeDto implements IManageJobType {
  @IsOptional()
  @IsNumber()
  jobTypeId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  jobType: string;

  @IsOptional()
  @IsObject()
  imagePath: object;

}
