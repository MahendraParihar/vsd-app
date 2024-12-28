import { IManageMatrimonialStatus, IMediaUpload } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class MatrimonialStatusDto implements IManageMatrimonialStatus {
  @IsOptional()
  @IsNumber()
  matrimonialStatusId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  matrimonialStatus: string;

  @IsOptional()
  @IsArray()
  imagePath: IMediaUpload[];

}
