import { Column, DataType, Table, Model, UpdatedAt, CreatedAt, ForeignKey } from 'sequelize-typescript';
import { AddictionModel, AdminUserModel, FamilyModel } from '@server/common';

@Table({
  tableName: 'txn_family_addiction_mapping',
  schema: 'public',
  freezeTableName: true,
  timestamps: true,
})
export class FamilyAddictionMappingModel extends Model<FamilyAddictionMappingModel> {
  @Column({
    field: 'addiction_mapping_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  addictionMappingId: number;

  @ForeignKey(() => FamilyModel)
  @Column({
    field: 'family_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'FamilyModel',
      key: 'family_id',
    },
  })
  familyId: number;

  @ForeignKey(() => AddictionModel)
  @Column({
    field: 'addiction_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'AddictionModel',
      key: 'addiction_id',
    },
  })
  addictionId: number;

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
    field: 'visited_count',
    allowNull: false,
    defaultValue: 0,
    type: DataType.NUMBER,
  })
  visitedCount: number;

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
}
