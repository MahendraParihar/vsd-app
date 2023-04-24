import {BelongsTo, Column, CreatedAt, DataType, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'mst_matrimonial_status',
  timestamps: true
})
export class MstMatrimonialStatus extends Model<MstMatrimonialStatus> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  matrimonialStatusId: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true
  })
  matrimonialStatus: string;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  active: boolean;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'MatrimonialStatusCreatedBy'
  }) @Column({allowNull: false}) createdBy: number;
  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'MatrimonialStatusModifiedBy'
  }) @Column({allowNull: false}) modifiedBy: number;
}
