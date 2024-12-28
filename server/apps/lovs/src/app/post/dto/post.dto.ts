import { IManagePost, IMediaUpload } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class PostDto implements IManagePost {
  @IsOptional()
  @IsNumber()
  postId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  post: string;

  @IsOptional()
  @IsArray()
  imagePath: IMediaUpload[];
}
