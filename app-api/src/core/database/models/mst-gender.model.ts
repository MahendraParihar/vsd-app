import {BelongsTo, Column, CreatedAt, DataType, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'mst_gender',
  timestamps: true
})
export class MstGender extends Model<MstGender> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  genderId: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true
  })
  gender: string;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  active: boolean;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'GenderCreatedBy'
  }) @Column({allowNull: false}) createdBy: number;
  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'GenderModifiedBy'
  }) @Column({allowNull: false}) modifiedBy: number;
}
