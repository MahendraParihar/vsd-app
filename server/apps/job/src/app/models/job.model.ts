import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Scopes,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { AdminUserModel } from '@server/common';

@Table({
  tableName: 'txn_job',
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
      {
        attributes: ['adminUserId', 'firstName', 'lastName'],
        model: AdminUserModel,
        required: false,
        as: 'approvedByUser',
      },
    ],
  },
}))
export class JobModel extends Model<JobModel> {
  @Column({
    field: 'job_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  jobId: number;

  @Column({
    field: 'title',
    allowNull: false,
    type: DataType.STRING(100),
  })
  title: string;

  @Column({
    field: 'description',
    allowNull: false,
    type: DataType.TEXT,
  })
  description: string;

  @Column({
    field: 'date',
    allowNull: true,
    type: DataType.DATEONLY,
  })
  date: Date;

  @Column({
    field: 'time',
    allowNull: true,
    type: DataType.TIME,
  })
  time: Date;

  @Column({
    field: 'image_path',
    allowNull: true,
    type: DataType.JSONB,
  })
  imagePath: object;

  @Column({
    field: 'is_approved',
    allowNull: false,
    defaultValue: false,
    type: DataType.BOOLEAN,
  })
  isApproved: boolean;

  @ForeignKey(() => AdminUserModel)
  @Column({
    field: 'approved_by',
    allowNull: true,
    type: DataType.NUMBER,
    references: {
      model: 'AdminModel',
      key: 'admin_id',
    },
  })
  approvedBy: number;

  @Column({
    field: 'comment_applicable',
    allowNull: false,
    defaultValue: false,
    type: DataType.BOOLEAN,
  })
  commentApplicable: boolean;

  @Column({
    field: 'tags',
    allowNull: true,
    type: DataType.ARRAY(DataType.STRING),
  })
  tags: string[];

  @Column({
    field: 'url',
    allowNull: true,
    type: DataType.TEXT,
  })
  url: string;

  @Column({
    field: 'meta_title',
    allowNull: true,
    type: DataType.STRING(60),
  })
  metaTitle: string;

  @Column({
    field: 'meta_description',
    allowNull: true,
    type: DataType.STRING(160),
  })
  metaDescription: string;

  @Column({
    field: 'visited_count',
    allowNull: false,
    defaultValue: 0,
    type: DataType.NUMBER,
  })
  visitedCount: number;

  @Column({
    field: 'no_of_position',
    allowNull: false,
    defaultValue: 0,
    type: DataType.NUMBER,
  })
  noOfPosition: number;

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

  @BelongsTo(() => AdminUserModel, {as: 'createdByUser', foreignKey: 'createdBy', targetKey: 'adminUserId'})
  createdByUser: AdminUserModel;

  @BelongsTo(() => AdminUserModel, {as: 'updatedByUser', foreignKey: 'updatedBy', targetKey: 'adminUserId'})
  updatedByUser: AdminUserModel;

  @BelongsTo(() => AdminUserModel, {as: 'approvedByUser', foreignKey: 'approvedBy', targetKey: 'adminUserId'})
  approvedByUser: AdminUserModel;
}
