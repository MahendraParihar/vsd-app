import { IManageAddiction, IMediaUpload } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class AddressTypeDto implements IManageAddiction {
  @IsOptional()
  @IsNumber()
  addictionId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  addiction: string;

  @IsOptional()
  @IsArray()
  imagePath: IMediaUpload[];

}
