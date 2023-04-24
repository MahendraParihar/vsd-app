import {BelongsTo, Column, CreatedAt, DataType, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'mst_marital_status',
  timestamps: true
})
export class MstMaritalStatus extends Model<MstMaritalStatus> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  maritalStatusId: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true
  })
  maritalStatus: string;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  active: boolean;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'MaritalStatusCreatedBy'
  }) @Column({allowNull: false}) createdBy: number;
  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'MaritalStatusModifiedBy'
  }) @Column({allowNull: false}) modifiedBy: number;
}
