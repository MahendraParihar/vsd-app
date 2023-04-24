import {BelongsTo, Column, DataType, Model, Table} from 'sequelize-typescript';
import {MstMediaSrc} from './mst-media-src.model';
import {MstMediaType} from './mst-media-type.model';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'txn_media',
  timestamps: true
})
export class TxnMedia extends Model<TxnMedia> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  mediaId: number;

  @Column({
    allowNull: false,
  })
  tableId: number;

  @Column({
    allowNull: false,
  })
  pkOfTable: number;

  @BelongsTo(() => MstMediaSrc, {
    foreignKey: 'mediaSrcId',
    targetKey: 'mediaSrcId',
    as: 'MediaMediaSrc'
  })
  @Column({
    allowNull: false,
  })
  mediaSrcId: number;

  @BelongsTo(() => MstMediaType, {
    foreignKey: 'mediaTypeId',
    targetKey: 'mediaTypeId',
    as: 'MediaMediaType'
  })
  @Column({
    allowNull: false,
  })
  mediaTypeId: number;

  @Column({
    allowNull: true,
  })
  thumbnail: string;

  @Column({
    allowNull: true,
  })
  mediaPath: string;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  active: boolean;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'MediaCreatedBy'
  })
  @Column({
    allowNull: false,
    defaultValue: null
  })
  createdBy: number;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'MediaModifiedBy'
  })
  @Column({
    allowNull: false,
    defaultValue: null
  })
  modifiedBy: number;
}
