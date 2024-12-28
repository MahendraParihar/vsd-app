import { IsArray, IsOptional, IsString } from 'class-validator';
import { ICommonSEO } from '@vsd-common/lib';

export class SeoDto implements ICommonSEO {
  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsOptional()
  @IsString()
  metaTitle?: string;

  @IsOptional()
  @IsString()
  metaDescription?: string;

  @IsOptional()
  @IsString()
  url?: string;
}
