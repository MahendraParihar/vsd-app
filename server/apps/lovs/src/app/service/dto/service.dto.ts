import { IManageService, IMediaUpload } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class ServiceDto implements IManageService {
  @IsOptional()
  @IsNumber()
  serviceId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  service: string;

  @IsOptional()
  @IsArray()
  imagePath: IMediaUpload[];

}
