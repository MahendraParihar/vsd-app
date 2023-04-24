import {BelongsTo, Column, CreatedAt, DataType, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'mst_matrimonial_requested_status',
  timestamps: true
})
export class MstMatrimonialRequestedStatus extends Model<MstMatrimonialRequestedStatus> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  requestedStatusId: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  requestedStatus: string;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  active: boolean;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'MatrimonialRequestedStatusCreatedBy'
  }) @Column({allowNull: false}) createdBy: number;
  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'MatrimonialRequestedStatusModifiedBy'
  }) @Column({allowNull: false}) modifiedBy: number;
}
