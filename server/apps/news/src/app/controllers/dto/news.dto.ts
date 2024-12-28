import { IManageNews, IMediaUpload } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { SeoDto } from '@server/common';

export class NewsDto extends SeoDto implements IManageNews {
  @IsOptional()
  @IsNumber()
  currentAffairId?: number;

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
  commentApplicable: boolean;
  tags: string[];
  visitedCount: number;
  approvedBy: number;
}
