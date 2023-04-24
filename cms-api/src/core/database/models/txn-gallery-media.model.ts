import {BelongsTo, Column, DataType, Index, Model, Table} from 'sequelize-typescript';
import {TxnGallery} from './txn-gallery.model';
import {MstMediaType} from './mst-media-type.model';
import {MstMediaSrc} from './mst-media-src.model';

@Table({
  modelName: 'txn_gallery_media',
  timestamps: true
})
export class TxnGalleryMedia extends Model<TxnGalleryMedia> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  galleryMediaId: number;

  @Index('idx-gallery-media-gallery-id')
  @BelongsTo(() => TxnGallery, {
    foreignKey: 'galleryId',
    targetKey: 'galleryId',
    as: 'GalleryMediaGallery'
  })
  @Column({
    allowNull: true
  })
  galleryId: number;

  @BelongsTo(() => MstMediaType, {
    foreignKey: 'mediaTypeId',
    targetKey: 'mediaTypeId',
    as: 'GalleryMediaType'
  })
  @Column({
    allowNull: false,
  })
  mediaTypeId: number;

  @BelongsTo(() => MstMediaSrc, {
    foreignKey: 'mediaSrcId',
    targetKey: 'mediaSrcId',
    as: 'GalleryMediaSrc'
  })
  @Column({
    allowNull: false,
  })
  mediaSrcId: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  thumbnail: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  mediaPath: string;
}
