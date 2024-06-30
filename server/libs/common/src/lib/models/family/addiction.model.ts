import {
  Column,
  DataType,
  Table,
  Model,
  UpdatedAt,
  CreatedAt,
  ForeignKey,
  BelongsTo,
  Scopes,
} from 'sequelize-typescript';
import { AdminUserModel } from '../admin';

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
@Table({
  tableName: 'mst_addiction',
  schema: 'public',
  freezeTableName: true,
  timestamps: true,
})
export class AddictionModel extends Model<AddictionModel> {
  @Column({
    field: 'addiction_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  addictionId: number;

  @Column({
    field: 'addiction',
    allowNull: false,
    type: DataType.STRING(50),
  })
  addiction: string;

  @Column({
    field: 'image_path',
    allowNull: true,
    type: DataType.JSONB,
  })
  imagePath: object;

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

  @ForeignKey(() => AdminUserModel)
  @Column({
    field: 'created_by',
    type: DataType.INTEGER,
    references: {
      model: 'AdminModel',
      key: 'adminUserId',
    },
  })
  createdBy: number;

  @UpdatedAt
  @Column({
    field: 'updated_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;

  @ForeignKey(() => AdminUserModel)
  @Column({
    field: 'modified_by',
    type: DataType.INTEGER,
    references: {
      model: 'AdminModel',
      key: 'adminUserId',
    },
  })
  modifiedBy: number;

  @Column({
    field: 'created_ip',
    allowNull: true,
    type: DataType.STRING(50),
  })
  createdIp: string;

  @Column({
    field: 'modified_ip',
    allowNull: true,
    type: DataType.STRING(50),
  })
  modifiedIp: string;

  @BelongsTo(() => AdminUserModel, { as: 'createdByUser', foreignKey: 'createdBy', targetKey: 'adminUserId' })
  createdByUser: AdminUserModel;

  @BelongsTo(() => AdminUserModel, { as: 'updatedByUser', foreignKey: 'modifiedBy', targetKey: 'adminUserId' })
  updatedByUser: AdminUserModel;
}
