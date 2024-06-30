import { IManageAddiction } from '@vsd-common/lib';
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class AddictionDto implements IManageAddiction {
  @IsOptional()
  @IsNumber()
  addictionId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  addiction: string;

  @IsOptional()
  @IsObject()
  imagePath: object;

}
