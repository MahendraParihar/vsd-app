import { IManageContactType, IMediaUpload } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class ContactTypeDto implements IManageContactType {
  @IsOptional()
  @IsNumber()
  contactTypeId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  contactType: string;

  @IsOptional()
  @IsArray()
  imagePath: IMediaUpload[];

}
