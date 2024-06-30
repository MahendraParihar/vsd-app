import { Column, DataType, Table, Model, UpdatedAt, CreatedAt, ForeignKey, Scopes } from 'sequelize-typescript';
import { TableModel } from '../table.model';
import { AdminUserModel } from '../admin';

@Table({
  tableName: 'txn_gallery',
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
export class GalleryModel extends Model<GalleryModel> {
  @Column({
    field: 'gallery_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  galleryId: number;

  @ForeignKey(() => TableModel)
  @Column({
    field: 'table_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'TableModel',
      key: 'table_id',
    },
  })
  tableId: number;

  @Column({
    field: 'pk_of_table',
    allowNull: false,
    type: DataType.NUMBER,
  })
  pkOfTable: number;

  @Column({
    field: 'title',
    allowNull: false,
    type: DataType.STRING(100),
  })
  title: string;

  @Column({
    field: 'url',
    allowNull: false,
    type: DataType.STRING(250),
  })
  url: string;

  @Column({
    field: 'active',
    allowNull: false,
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  active: boolean;

  @CreatedAt
  @Column({
    field: 'created_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    field: 'created_by',
    type: DataType.INTEGER,
  })
  createdBy: number;

  @UpdatedAt
  @Column({
    field: 'updated_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;

  @Column({
    field: 'modified_by',
    type: DataType.INTEGER,
  })
  modifiedBy: number;
}
