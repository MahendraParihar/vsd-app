import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { FamilyModel, PostModel } from '@server/common';
import { MandalModel } from './mandal.model';

@Table({
  tableName: 'txn_mandal_member',
  schema: 'public',
  freezeTableName: true,
  timestamps: false,
  createdAt: false,
  updatedAt: false,
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

  @BelongsTo(() => PostModel, { as: 'post', foreignKey: 'postId', targetKey: 'postId' })
  post: PostModel;

  @BelongsTo(() => FamilyModel, { as: 'family', foreignKey: 'familyId', targetKey: 'familyId' })
  family: FamilyModel;
}
