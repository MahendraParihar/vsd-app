import {BelongsTo, Column, CreatedAt, DataType, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {MstState} from './mst-state.model';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'mst_district',
  timestamps: true
})
export class MstDistrict extends Model<MstDistrict> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  districtId: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  district: string;

  @BelongsTo(() => MstState, {
    foreignKey: 'stateId',
    targetKey: 'stateId',
    as: 'DistrictState'
  })
  @Column({
    allowNull: false,
  })
  stateId: number;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  active: boolean;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'DistrictCreatedBy'
  })
  @Column({
    allowNull: false
  })
  createdBy: number;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'DistrictModifiedBy'
  })
  @Column({
    allowNull: false
  })
  modifiedBy: number;
}
