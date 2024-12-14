import {
  Column,
  DataType,
  Table,
  Model,
  UpdatedAt,
  CreatedAt,
  ForeignKey,
  Scopes,
  BelongsTo,
} from 'sequelize-typescript';
import { JobCategoryModel } from './job-category.model';
import { AdminUserModel } from '../admin';

@Table({
  tableName: 'mst_job_sub_category',
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
export class JobSubCategoryModel extends Model<JobSubCategoryModel> {
  @Column({
    field: 'job_sub_category_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  jobSubCategoryId: number;

  @Column({
    field: 'job_sub_category',
    allowNull: false,
    type: DataType.STRING(100),
  })
  jobSubCategory: string;

  @ForeignKey(() => JobCategoryModel)
  @Column({
    field: 'job_category_id',
    allowNull: false,
    type: DataType.INTEGER,
    references: {
      model: 'JobCategoryModel',
      key: 'job_category_id',
    },
  })
  jobCategoryId: number;

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
    field: 'updated_by',
    type: DataType.INTEGER,
  })
  updatedBy: number;

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

  @BelongsTo(() => AdminUserModel, { as: 'updatedByUser', foreignKey: 'updatedBy', targetKey: 'adminUserId' })
  updatedByUser: AdminUserModel;
}
