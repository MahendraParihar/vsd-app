import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { StateModel } from './state.model';
import { DistrictModel } from './district.model';
import { CityVillageModel } from './city-village.model';
import { CountryModel } from './country.model';

@Table({
  tableName: 'txn_address',
  schema: 'public',
  freezeTableName: true,
  timestamps: true,
})
export class AddressModel extends Model<AddressModel> {
  @Column({
    field: 'address_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  addressId: number;

  @Column({
    field: 'address_type_id',
    allowNull: false,
    type: DataType.NUMBER,
  })
  addressTypeId: number;

  @Column({
    field: 'address',
    allowNull: false,
    type: DataType.STRING(100),
  })
  address: string;

  @Column({
    field: 'pin_code',
    allowNull: false,
    type: DataType.NUMBER,
  })
  pinCode: string;

  @Column({
    field: 'latitude',
    allowNull: true,
    type: DataType.STRING(100),
  })
  latitude: string;

  @Column({
    field: 'longitude',
    allowNull: true,
    type: DataType.STRING(100),
  })
  longitude: string;

  @ForeignKey(() => CountryModel)
  @Column({
    field: 'country_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'CountryModel',
      key: 'country_id',
    },
  })
  countryId: number;

  @ForeignKey(() => StateModel)
  @Column({
    field: 'state_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'StateModel',
      key: 'state_id',
    },
  })
  stateId: number;

  @ForeignKey(() => DistrictModel)
  @Column({
    field: 'district_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'DistrictModel',
      key: 'district_id',
    },
  })
  districtId: number;

  @ForeignKey(() => CityVillageModel)
  @Column({
    field: 'city_village_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'CityVillageModel',
      key: 'city_village_id',
    },
  })
  cityVillageId: number;

  @Column({
    field: 'active',
    allowNull: false,
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  active: boolean;

  @CreatedAt
  @Column({
    field: 'created_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    field: 'created_by',
    type: DataType.INTEGER,
  })
  createdBy: number;

  @UpdatedAt
  @Column({
    field: 'updated_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;

  @Column({
    field: 'modified_by',
    type: DataType.INTEGER,
  })
  modifiedBy: number;

  @Column({
    field: 'created_ip',
    allowNull: true,
    type: DataType.STRING(50),
  })
  createdIp: string;

  @Column({
    field: 'modified_ip',
    allowNull: true,
    type: DataType.STRING(50),
  })
  modifiedIp: string;

  @BelongsTo(() => CountryModel, { targetKey: 'countryId', foreignKey: 'countryId' })
  country: CountryModel;

  @BelongsTo(() => StateModel, { targetKey: 'stateId', foreignKey: 'stateId' })
  state: StateModel;

  @BelongsTo(() => DistrictModel, { targetKey: 'districtId', foreignKey: 'districtId' })
  district: DistrictModel;

  @BelongsTo(() => CityVillageModel, { targetKey: 'cityVillageId', foreignKey: 'cityVillageId' })
  cityVillage: CityVillageModel;
}
