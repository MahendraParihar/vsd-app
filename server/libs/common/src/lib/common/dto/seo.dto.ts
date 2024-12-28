import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ICommonSEO } from '@vsd-common/lib';

export class SeoDto implements ICommonSEO {
  @IsArray()
  @IsNotEmpty()
  tags: string[];

  @IsNotEmpty()
  @IsString()
  metaTitle: string;

  @IsNotEmpty()
  @IsString()
  metaDescription: string;

  @IsNotEmpty()
  @IsString()
  url: string;
}
