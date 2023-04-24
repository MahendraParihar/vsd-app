import {Body, Controller, Get, Post, Query, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {JwtAuthGuard} from '../../account/jwt-auth.guard';
import {CommonService} from "../common.service";
import {ServerResponseEnum} from "../../../enums/server-response-enum";
import {StringResource} from "../../../enums/string-resource";
import {FileInterceptor} from '@nestjs/platform-express';
import {MediaDto} from "../../../common-dto/media.dto";

import {promisify} from "util";

const {join} = require('path');
import * as fs from "fs";

const mv = promisify(fs.rename);
import {IS_DEV} from "../../../constants/config-constants";
import {MediaFolderEnum} from "../../../enums/media-folder-enum";
import {diskStorage} from "multer";
import {MulterOptions} from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

@Controller('common')
export class CommonController {

  constructor(private service: CommonService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('address-master')
  async addressMasterData(@Query() req) {
    const cityVillageList = await this.service.getCityVillageList();
    const districtList = await this.service.getDistrictList();
    const stateList = await this.service.getStateList();
    const countryList = await this.service.getCountryList();
    const addressTypeList = await this.service.getAddressTypeList();
    return {
      code: ServerResponseEnum.SUCCESS,
      message: StringResource.SUCCESS,
      data: {
        cityVillage: cityVillageList,
        district: districtList,
        state: stateList,
        country: countryList,
        addressType: addressTypeList,
      },
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('contact-number-master')
  async contactNumberMasterData(@Query() req) {
    const countryList = await this.service.getCountryCodeList();
    const contactTypeList = await this.service.getContactTypeList();
    return {
      code: ServerResponseEnum.SUCCESS,
      message: StringResource.SUCCESS,
      data: {
        country: countryList,
        contactType: contactTypeList,
      },
    }
  }

  @Post('media/upload-media')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', {
    dest:`${MediaFolderEnum.UPLOAD_FILE_PATH}/${MediaFolderEnum.UPLOADS}`
  }))
  async uploadFile(@Body() mediaDto: MediaDto, @UploadedFile() file: Express.Multer.File) {
    try {
      const currentPath = `${file.destination}/${file.filename}`;
      const destinationPath = `${MediaFolderEnum.UPLOAD_FILE_PATH}/${mediaDto.mediaFor}/${file.filename}`;
      await CommonController.moveFile(currentPath, destinationPath);
      const res = {
        fieldName: file.fieldname,
        fileName: file.filename,
        originalName: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        size: file.size,
        webUrl: `${MediaFolderEnum.MEDIA_FOLDER}/${mediaDto.mediaFor}/${file.filename}`
      }
      console.log(file);
      return {
        code: ServerResponseEnum.SUCCESS,
        message: StringResource.SUCCESS,
        data: res
      };
    } catch (e) {
      return {
        code: ServerResponseEnum.ERROR,
        message: IS_DEV ? e['message'] : StringResource.SOMETHING_WENT_WRONG,
        data: null
      };
    }
  }

  private static async moveFile(currentPath, destinationPath) {
    const original = join(currentPath);
    const target = join(destinationPath);
    await mv(original, target);
  }

  @UseGuards(JwtAuthGuard)
  @Get('search-user')
  async searchUser(@Query('searchStr') str: string) {
    const list = await this.service.getUserList(str);
    return {
      code: ServerResponseEnum.SUCCESS,
      message: StringResource.SUCCESS,
      data: list,
    }
  }

  editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = '.' + file.originalname.split('.')[1];
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
  };

  imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  };
}
