import { IManageCaste } from '@vsd-common/lib';
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class CasteDto implements IManageCaste {
  @IsOptional()
  @IsNumber()
  casteId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  caste: string;

  @IsOptional()
  @IsObject()
  imagePath: object;

}
