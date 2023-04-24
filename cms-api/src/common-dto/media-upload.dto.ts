import {IsNotEmpty} from 'class-validator';

export class MediaUploadDto {
  @IsNotEmpty()
  fieldName: string;

  @IsNotEmpty()
  originalName: string;

  @IsNotEmpty()
  encoding: string;

  @IsNotEmpty()
  mimetype: string;

  @IsNotEmpty()
  fileName: string;

  @IsNotEmpty()
  path: string;

  @IsNotEmpty()
  size: number;

  @IsNotEmpty()
  webUrl: string;
}
