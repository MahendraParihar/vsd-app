import { IManageJobStatus, IMediaUpload } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class JobStatusDto implements IManageJobStatus {
  @IsOptional()
  @IsNumber()
  jobStatusId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  jobStatus: string;

  @IsOptional()
  @IsArray()
  imagePath: IMediaUpload[];

}
