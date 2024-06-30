import {IManageJob} from '@vsd-common/lib';
import {IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength} from 'class-validator';

export class JobDto implements IManageJob {
  @IsOptional()
  @IsNumber()
  jobId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  title: string;

  @IsOptional()
  @IsObject()
  imagePath: object;

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
