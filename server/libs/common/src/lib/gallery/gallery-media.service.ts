import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GalleryMediaModel } from '../models/gallery';

@Injectable()
export class GalleryMediaService {
  constructor(@InjectModel(GalleryMediaModel) private galleryMediaModel: typeof GalleryMediaModel) {}

  load() {}

  getById() {}

  loadDetailById() {}

  manage() {}

  updateStatus() {}
}
