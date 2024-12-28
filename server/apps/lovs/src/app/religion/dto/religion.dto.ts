import { IManageReligion, IMediaUpload } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class ReligionDto implements IManageReligion {
  @IsOptional()
  @IsNumber()
  religionId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  religion: string;

  @IsOptional()
  @IsArray()
  imagePath: IMediaUpload[];

}
