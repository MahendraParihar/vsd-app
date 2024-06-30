import { IManageJobStatus } from '@vsd-common/lib';
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class JobStatusDto implements IManageJobStatus {
  @IsOptional()
  @IsNumber()
  jobStatusId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  jobStatus: string;

  @IsOptional()
  @IsObject()
  imagePath: object;

}
