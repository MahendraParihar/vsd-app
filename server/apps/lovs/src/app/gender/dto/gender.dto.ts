import { IManageGender, IMediaUpload } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class GenderDto implements IManageGender {
  @IsOptional()
  @IsNumber()
  genderId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  gender: string;

  @IsOptional()
  @IsArray()
  imagePath: IMediaUpload[];

}
