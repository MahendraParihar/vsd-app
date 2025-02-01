import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { IMemberPost } from '@vsd-common/lib';
import { Type } from 'class-transformer';

export class MemberPostDto implements IMemberPost {
  @IsNotEmpty()
  @IsNumber()
  postId: number;

  @IsArray()
  @IsNotEmpty()
  @Type(() => Number)
  familyIds: number[];
}
