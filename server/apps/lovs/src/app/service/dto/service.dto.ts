import { IManageService } from '@vsd-common/lib';
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class ServiceDto implements IManageService {
  @IsOptional()
  @IsNumber()
  serviceId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  service: string;

  @IsOptional()
  @IsObject()
  imagePath: object;

}
