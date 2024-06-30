import { IManageCityVillage } from '@vsd-common/lib';
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class CityVillageDto implements IManageCityVillage {
  @IsOptional()
  @IsNumber()
  cityVillageId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  cityVillage: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  pinCode: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  stdCode: string;

  @IsNotEmpty()
  @IsNumber()
  districtId: number;

  @IsOptional()
  @IsObject()
  imagePath: object;

}
