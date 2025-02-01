import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { FamilyModel, PostModel } from '@server/common';
import { FacilityModel } from './facility.model';

@Table({
  tableName: 'txn_facility_member',
  schema: 'public',
  freezeTableName: true,
  timestamps: false,
  createdAt: false,
  updatedAt: false,
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

  @BelongsTo(() => PostModel, { as: 'post', foreignKey: 'postId', targetKey: 'postId' })
  post: PostModel;

  @BelongsTo(() => FamilyModel, { as: 'family', foreignKey: 'familyId', targetKey: 'familyId' })
  family: FamilyModel;

  @BelongsTo(() => FacilityModel, { as: 'facility', foreignKey: 'facilityId', targetKey: 'facilityId' })
  facility: FacilityModel;
}
