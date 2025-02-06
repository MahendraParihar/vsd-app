import {
  Body,
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import fs from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaDto } from './dto/media-for.dto';
import { CommonUtil } from '../common.util';
import { Env } from '@server/common';

@Controller('media')
export class MediaController {
  @Post('upload-media')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Body() mediaDto: MediaDto,
                   @UploadedFile(
                     new ParseFilePipeBuilder()
                       .addMaxSizeValidator({ maxSize: 5 * 1024 * 1024 })
                       .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
                   ) file: File) {
    const fileName = file['originalname'].replace(/[/\\?%*:|"<>]/g, '-');
    const destinationFolderPath = `${CommonUtil.getMediaFolderPath}/${mediaDto.mediaFor}`;
    const destinationPath = `${destinationFolderPath}/${fileName}`;

    //CREATE DIRECTORY IF NOT EXISTS
    if (!fs.existsSync(destinationFolderPath)) {
      fs.mkdirSync(destinationFolderPath, { recursive: true });
    }

    //Write File
    await fs.writeFileSync(destinationPath, file['buffer']);
    return {
      fieldName: file['fieldname'],
      fileName: fileName,
      originalName: file['originalname'],
      encoding: file['encoding'],
      mimetype: file['mimetype'],
      size: file['size'],
      webUrl: `${Env.baseMediaPath}${mediaDto.mediaFor}/${fileName}`,
    };
  }
}
