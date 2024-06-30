import { IManageMatrimonialRequestedStatus } from '@vsd-common/lib';
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class MatrimonialRequestedStatusDto implements IManageMatrimonialRequestedStatus {
  @IsOptional()
  @IsNumber()
  matrimonialRequestedStatusId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  matrimonialRequestedStatus: string;

  @IsOptional()
  @IsObject()
  imagePath: object;

}
