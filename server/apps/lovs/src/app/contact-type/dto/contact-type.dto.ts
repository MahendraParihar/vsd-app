import { IManageContactType } from '@vsd-common/lib';
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class ContactTypeDto implements IManageContactType {
  @IsOptional()
  @IsNumber()
  contactTypeId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  contactType: string;

  @IsOptional()
  @IsObject()
  imagePath: object;

}
