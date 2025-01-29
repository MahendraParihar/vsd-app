import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { FamilyModel, PostModel } from '@server/common';
import { FacilityModel } from './facility.model';

@Table({
  tableName: 'txn_facility_member',
  schema: 'public',
  freezeTableName: true,
  timestamps: true,
})
export class FacilityMemberModel extends Model<FacilityMemberModel> {
  @Column({
    field: 'facility_member_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  facilityMemberId: number;

  @ForeignKey(() => FacilityModel)
  @Column({
    field: 'facility_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'FacilityModel',
      key: 'facility_id',
    },
  })
  facilityId: number;

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

  @BelongsTo(() => PostModel, { as: 'post', foreignKey: 'postId', targetKey: 'postId' })
  post: PostModel;

  @BelongsTo(() => FamilyModel, { as: 'family', foreignKey: 'familyId', targetKey: 'familyId' })
  family: FamilyModel;

  @BelongsTo(() => FacilityModel, { as: 'facility', foreignKey: 'facilityId', targetKey: 'facilityId' })
  facility: FacilityModel;
}
