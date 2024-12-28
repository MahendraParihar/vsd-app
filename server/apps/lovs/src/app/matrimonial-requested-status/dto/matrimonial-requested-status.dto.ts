import { IManageMatrimonialRequestedStatus, IMediaUpload } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class MatrimonialRequestedStatusDto implements IManageMatrimonialRequestedStatus {
  @IsOptional()
  @IsNumber()
  matrimonialRequestedStatusId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  matrimonialRequestedStatus: string;

  @IsOptional()
  @IsArray()
  imagePath: IMediaUpload[];

}
