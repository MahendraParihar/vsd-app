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
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { FileHelper } from './file-helper';
import { join } from 'path';
import { promisify } from 'util';
import { MediaForEnum } from '@vsd-common/lib';
import { diskStorage } from 'multer';
import { MediaDto } from './dto/media-for.dto';
import { CommonUtil } from '../common.util';
import { Express } from 'express';

const mv = promisify(fs.rename);
const VALID_UPLOADS_MIME_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

@Controller('media')
export class MediaController {
  @Post('upload-media')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req: any, file: any, cb: any) => {
          cb(null, `${CommonUtil.getMediaFolderPath}/${MediaForEnum.UPLOADS}`);
        },
        filename: FileHelper.customFileName,
      }),
    }),
  )
  async uploadFile(@Body() mediaDto: MediaDto, @UploadedFile(
    new ParseFilePipeBuilder()
      .addMaxSizeValidator({ maxSize: 5 * 1024 * 1024 })
      .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
  ) file: Express.Multer.File, a: MulterOptions) {
    const currentPath = `${file.destination}/${file.filename}`;
    const destinationFolderPath = `${CommonUtil.getMediaFolderPath}/${mediaDto.mediaFor}`;
    const destinationPath = `${destinationFolderPath}/${file.filename}`;

    //CREATE DIRECTORY IF NOT EXISTS
    if (!fs.existsSync(destinationFolderPath)) {
      fs.mkdirSync(destinationFolderPath, { recursive: true });
    }

    await this.moveFile(currentPath, destinationPath);
    return {
      fieldName: file.fieldname,
      fileName: file.filename,
      originalName: file.originalname,
      encoding: file.encoding,
      mimetype: file.mimetype,
      size: file.size,
      webUrl: `${MediaForEnum.MEDIA_FOLDER}/${mediaDto.mediaFor}/${file.filename}`,
    };
  }

  private async moveFile(currentPath: string, destinationPath: string) {
    const original = join(currentPath);
    const target = join(destinationPath);
    await mv(original, target);
  }
}
