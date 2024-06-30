import { IManageGender } from '@vsd-common/lib';
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class GenderDto implements IManageGender {
  @IsOptional()
  @IsNumber()
  genderId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  gender: string;

  @IsOptional()
  @IsObject()
  imagePath: object;

}
