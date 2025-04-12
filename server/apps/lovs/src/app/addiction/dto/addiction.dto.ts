import { IManageAddiction, IMediaUpload, InputLength } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class AddictionDto implements IManageAddiction {
  @IsOptional()
  @IsNumber()
  addictionId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(InputLength.CHAR_50)
  addiction: string;

  @IsOptional()
  @IsArray()
  imagePath: IMediaUpload[];

}
