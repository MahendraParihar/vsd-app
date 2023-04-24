import {BelongsTo, Column, CreatedAt, DataType, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {MstAddressType} from './mst-address-type.model';
import {MstCityVillage} from './mst-city-village.model';
import {MstDistrict} from "./mst-district.model";
import {MstState} from "./mst-state.model";
import {MstCountry} from "./mst-country.model";
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'txn_address',
  timestamps: true
})
export class TxnAddress extends Model<TxnAddress> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  addressId: number;

  @Column({
    allowNull: false,
  })
  tableId: number;

  @Column({
    allowNull: false,
  })
  pkOfTable: number;

  @BelongsTo(() => MstAddressType, {
    foreignKey: 'addressTypeId',
    targetKey: 'addressTypeId',
    as: 'AddressAddressType'
  })
  @Column({
    allowNull: false,
  })
  addressTypeId: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  address: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
  })
  pinCode: string;

  @BelongsTo(() => MstCityVillage, {
    foreignKey: 'cityVillageId',
    targetKey: 'cityVillageId',
    as: 'AddressCityVillage'
  })
  @Column({
    allowNull: false,
  })
  cityVillageId: number;

  @BelongsTo(() => MstDistrict, {
    foreignKey: 'districtId',
    targetKey: 'districtId',
    as: 'AddressDistrict'
  })
  @Column({
    allowNull: false,
  })
  districtId: number;

  @BelongsTo(() => MstState, {
    foreignKey: 'stateId',
    targetKey: 'stateId',
    as: 'AddressState'
  })
  @Column({
    allowNull: false,
  })
  stateId: number;

  @BelongsTo(() => MstCountry, {
    foreignKey: 'countryId',
    targetKey: 'countryId',
    as: 'AddressCountry'
  })
  @Column({
    allowNull: false,
  })
  countryId: number;

  @Column({
    type: DataType.FLOAT,
  })
  latitude: number;

  @Column({
    type: DataType.FLOAT,
  })
  longitude: number;

  @Column({defaultValue: true})
  active: boolean;

  @Column
  createdIp: string;

  @Column
  modifiedIp: string;
}
