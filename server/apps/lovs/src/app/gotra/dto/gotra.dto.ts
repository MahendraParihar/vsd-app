import { IManageGotra } from '@vsd-common/lib';
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class GotraDto implements IManageGotra {
  @IsOptional()
  @IsNumber()
  gotraId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  gotra: string;

  @IsOptional()
  @IsObject()
  imagePath: object;

}
