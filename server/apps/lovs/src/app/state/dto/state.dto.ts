import { IManageState } from '@vsd-common/lib';
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class StateDto implements IManageState {
  @IsOptional()
  @IsNumber()
  stateId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  state: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  code: string;

  @IsNotEmpty()
  @IsNumber()
  countryId: number;

  @IsOptional()
  @IsObject()
  imagePath: object;

}
