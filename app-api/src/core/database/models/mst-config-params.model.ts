import {BelongsTo, Column, CreatedAt, DataType, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'mst_config_params',
  timestamps: true
})
export class MstConfigParams extends Model<MstConfigParams> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  configParamsId: number;

  @Column({
    allowNull: false,
  })
  configParams: string;

  @Column({
    allowNull: false,
  })
  configParamsValue: string;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  active: boolean;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'ConfigParamsCreatedBy'
  })
  @Column({
    allowNull: false
  })
  createdBy: number;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'ConfigParamsModifiedBy'
  })
  @Column({
    allowNull: false
  })
  modifiedBy: number;
}
