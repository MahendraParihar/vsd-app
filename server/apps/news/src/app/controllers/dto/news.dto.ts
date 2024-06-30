import {IManageNews} from '@vsd-common/lib';
import {IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength} from 'class-validator';

export class NewsDto implements IManageNews {
  @IsOptional()
  @IsNumber()
  currentAffairId?: number;

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
  commentApplicable: boolean;
  tags: string[];
  visitedCount: number;
  approvedBy: number;
}
