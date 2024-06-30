import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GalleryModel } from '../models/gallery';

@Injectable()
export class GalleryService {
  constructor(@InjectModel(GalleryModel) private galleryModel: typeof GalleryModel) {}

  load() {}

  getById() {}

  loadDetailById() {}

  manage() {}

  updateStatus() {}
}
