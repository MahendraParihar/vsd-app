import { IManagePost } from '@vsd-common/lib';
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class PostDto implements IManagePost {
  @IsOptional()
  @IsNumber()
  postId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  post: string;

  @IsOptional()
  @IsObject()
  imagePath: object;

}
