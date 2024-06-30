import { IManageReligion } from '@vsd-common/lib';
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class ReligionDto implements IManageReligion {
  @IsOptional()
  @IsNumber()
  religionId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  religion: string;

  @IsOptional()
  @IsObject()
  imagePath: object;

}
