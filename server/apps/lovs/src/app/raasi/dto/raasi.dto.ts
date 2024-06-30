import { IManageRaasi } from '@vsd-common/lib';
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class RaasiDto implements IManageRaasi {
  @IsOptional()
  @IsNumber()
  raasiId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  raasi: string;

  @IsOptional()
  @IsObject()
  imagePath: object;

}
