import { IManageDistrict } from '@vsd-common/lib';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class DistrictDto implements IManageDistrict {
  @IsOptional()
  @IsNumber()
  districtId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  district: string;

  @IsNotEmpty()
  @IsNumber()
  stateId: number;

}
