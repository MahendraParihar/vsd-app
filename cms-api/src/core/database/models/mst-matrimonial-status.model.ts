import {BelongsTo, Column, DataType, Model, Table} from 'sequelize-typescript';
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
    as: 'CreatedBy'
  }) @Column({allowNull: false}) createdBy: number;
  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'ModifiedBy'
  }) @Column({allowNull: false}) modifiedBy: number;
}
