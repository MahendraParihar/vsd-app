import {BelongsTo, Column, DataType, Model, Table} from 'sequelize-typescript';
import {MstTable} from './mst-table.model';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'txn_gallery',
  timestamps: true
})
export class TxnGallery extends Model<TxnGallery> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  galleryId: number;

  @BelongsTo(() => MstTable, {
    foreignKey: 'tableId',
    targetKey: 'tableId',
    as: 'GalleryTable'
  })
  @Column({
    allowNull: true,
  })
  tableId: number;

  @Column({
    allowNull: true,
  })
  pkOfTable: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  title: string;

  @Column({defaultValue: true})
  active: boolean;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'CreatedBy'
  })
  @Column({
    allowNull: false,
    defaultValue: null
  })
  createdBy: number;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'ModifiedBy'
  })
  @Column({
    allowNull: false,
    defaultValue: null
  })
  modifiedBy: number;
}
