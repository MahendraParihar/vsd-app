import { IManageMatrimonialStatus } from '@vsd-common/lib';
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class MatrimonialStatusDto implements IManageMatrimonialStatus {
  @IsOptional()
  @IsNumber()
  matrimonialStatusId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  matrimonialStatus: string;

  @IsOptional()
  @IsObject()
  imagePath: object;

}
