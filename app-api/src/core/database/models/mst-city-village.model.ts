import {BelongsTo, Column, CreatedAt, DataType, Index, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {MstDistrict} from './mst-district.model';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'mst_city_village',
  timestamps: true
})
export class MstCityVillage extends Model<MstCityVillage> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  cityVillageId: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  cityVillage: string;

  @Column({
    allowNull: false,
  })
  typeId: number;

  @BelongsTo(() => MstDistrict, {
    foreignKey: 'districtId',
    targetKey: 'districtId',
    as: 'CityVillageDistrict'
  })
  @Column({
    allowNull: false,
  })
  districtId: number;

  @Column({
    type: DataType.STRING(10),
    allowNull: true,
  })
  pinCode: string;

  @Column({
    type: DataType.STRING(6),
    allowNull: true,
  })
  stdCode: string;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  active: boolean;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'CityVillageCreatedBy'
  })
  @Column({
    allowNull: false
  })
  createdBy: number;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'CityVillageModifiedBy'
  })
  @Column({
    allowNull: false
  })
  modifiedBy: number;
}
