import { IManageJob, IMediaUpload } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { SeoDto } from '@server/common';

export class JobDto extends SeoDto implements IManageJob {
  @IsOptional()
  @IsNumber()
  jobId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  title: string;

  @IsOptional()
  @IsArray()
  imagePath: IMediaUpload[];

  description: string;
  date: Date;
  time: Date;
  isApproved: boolean;
  approvedBy?: number;
  commentApplicable: boolean;
  tags: string[];
  visitedCount: number;
  noOfPosition: number;

}
