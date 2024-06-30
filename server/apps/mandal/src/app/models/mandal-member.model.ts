import { Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { FamilyModel, PostModel } from '@server/common';
import { MandalModel } from './mandal.model';

@Table({
  tableName: 'txn_mandal_member',
  schema: 'public',
  freezeTableName: true,
  timestamps: true,
})
export class MandalMemberModel extends Model<MandalMemberModel> {
  @Column({
    field: 'mandal_member_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  mandalMemberId: number;

  @ForeignKey(() => FamilyModel)
  @Column({
    field: 'family_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: FamilyModel,
      key: 'family_id',
    },
  })
  familyId: number;

  @ForeignKey(() => PostModel)
  @Column({
    field: 'post_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: PostModel,
      key: 'post_id',
    },
  })
  postId: number;

  @ForeignKey(() => MandalModel)
  @Column({
    field: 'mandal_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: MandalModel,
      key: 'mandal_id',
    },
  })
  mandalId: number;

  @Column({
    field: 'from_year',
    allowNull: false,
    type: DataType.DATEONLY,
  })
  fromYear: Date;

  @Column({
    field: 'to_year',
    allowNull: true,
    type: DataType.DATEONLY,
  })
  toYear: Date;

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
