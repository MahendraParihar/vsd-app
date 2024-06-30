import { IManageBusiness } from '@vsd-common/lib';
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class BusinessDto implements IManageBusiness {
  @IsOptional()
  @IsNumber()
  businessId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  business: string;

  @IsOptional()
  @IsObject()
  imagePath: object;

}
