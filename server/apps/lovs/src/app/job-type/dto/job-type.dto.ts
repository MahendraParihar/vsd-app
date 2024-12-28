import { IManageJobType, IMediaUpload } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class JobTypeDto implements IManageJobType {
  @IsOptional()
  @IsNumber()
  jobTypeId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  jobType: string;

  @IsOptional()
  @IsArray()
  imagePath: IMediaUpload[];

}
