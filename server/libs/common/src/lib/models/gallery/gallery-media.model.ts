import { Column, DataType, ForeignKey, Model, Scopes, Table } from 'sequelize-typescript';
import { MediaSrcModel } from '../media-src.model';
import { GalleryModel } from './gallery.model';
import { AdminUserModel } from '../admin';

@Table({
  tableName: 'txn_gallery_media',
  schema: 'public',
  freezeTableName: true,
  timestamps: true,
})
@Scopes(() => ({
  list: {
    include: [
      {
        attributes: ['adminUserId', 'firstName', 'lastName'],
        model: AdminUserModel,
        required: true,
        as: 'createdByUser',
      },
      {
        attributes: ['adminUserId', 'firstName', 'lastName'],
        model: AdminUserModel,
        required: true,
        as: 'updatedByUser',
      },
    ],
  },
}))
export class GalleryMediaModel extends Model<GalleryMediaModel> {
  @Column({
    field: 'gallery_image_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  galleryImageId: number;

  @ForeignKey(() => GalleryModel)
  @Column({
    field: 'gallery_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'GalleryModel',
      key: 'gallery_id',
    },
  })
  galleryId: number;

  @ForeignKey(() => MediaSrcModel)
  @Column({
    field: 'media_src_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'MediaSrcModel',
      key: 'media_src_id',
    },
  })
  mediaSrcId: number;

  @Column({
    field: 'thumb_image_path',
    allowNull: true,
    type: DataType.JSONB,
  })
  thumbImagePath: object;

  @Column({
    field: 'media_path',
    allowNull: true,
    type: DataType.JSONB,
  })
  mediaPath: object;
}
