import { IManageEducationDegree } from '@vsd-common/lib';
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class EducationDegreeDto implements IManageEducationDegree {
  @IsOptional()
  @IsNumber()
  educationDegreeId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  degree: string;

  @IsOptional()
  @IsObject()
  imagePath: object;

}
