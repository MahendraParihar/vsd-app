import { IManageAddressType, IMediaUpload, InputLength } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class AddressTypeDto implements IManageAddressType {
  @IsOptional()
  @IsNumber()
  addressTypeId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(InputLength.CHAR_50)
  addressType: string;

  @IsOptional()
  @IsArray()
  imagePath: IMediaUpload[];

}
