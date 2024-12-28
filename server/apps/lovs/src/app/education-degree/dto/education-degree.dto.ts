import { IManageEducationDegree, IMediaUpload } from '@vsd-common/lib';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class EducationDegreeDto implements IManageEducationDegree {
  @IsOptional()
  @IsNumber()
  educationDegreeId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  degree: string;

  @IsOptional()
  @IsArray()
  imagePath: IMediaUpload[];

}
