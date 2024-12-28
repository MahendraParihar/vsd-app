import { IManageBusiness, IMediaUpload } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class BusinessDto implements IManageBusiness {
  @IsOptional()
  @IsNumber()
  businessId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  business: string;

  @IsOptional()
  @IsArray()
  imagePath: IMediaUpload[];

}
