import {
  Column,
  DataType,
  Table,
  Model,
  UpdatedAt,
  CreatedAt,
  ForeignKey,
  BelongsTo,
  Scopes,
} from 'sequelize-typescript';
import {DistrictModel} from './district.model';
import {AdminUserModel} from '../admin';
import {StateModel} from "./state.model";
import {CountryModel} from "./country.model";

@Table({
  tableName: 'mst_city_village',
  schema: 'public',
  freezeTableName: true,
  timestamps: true,
})
@Scopes(() => ({
  list: {
    include: [
      {
        attributes: ['districtId', 'district'],
        model: DistrictModel,
        required: true,
        include: [{
          attributes: ['stateId', 'state'],
          model: StateModel,
          required: true,
          include: [{
            model: CountryModel,
            attributes: ['countryId', 'country'],
            required: true,
          }]
        }]
      },
      {
        attributes: ['adminUserId', 'firstName', 'lastName'],
        model: AdminUserModel,
        required: true,
        as: 'createdByUser',
      },
      {
        attributes: ['adminUserId', 'firstName', 'lastName'],
        model: AdminUserModel,
        required: true,
        as: 'updatedByUser',
      },
    ],
  },
}))
export class CityVillageModel extends Model<CityVillageModel> {
  @Column({
    field: 'city_village_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  cityVillageId: number;

  @Column({
    field: 'city_vilage',
    allowNull: false,
    type: DataType.STRING(100),
  })
  cityVillage: string;

  @ForeignKey(() => DistrictModel)
  @Column({
    field: 'district_id',
    allowNull: true,
    type: DataType.NUMBER,
    references: {
      model: 'DistrictModel',
      key: 'district_id',
    },
  })
  districtId: number;

  @Column({
    field: 'pin_code',
    allowNull: true,
    type: DataType.STRING(10),
  })
  pinCode: string;

  @Column({
    field: 'std_code',
    allowNull: true,
    type: DataType.STRING(10),
  })
  stdCode: string;

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

  @BelongsTo(() => DistrictModel, {targetKey: 'districtId', foreignKey: 'districtId'})
  district: DistrictModel;

  @BelongsTo(() => AdminUserModel, {as: 'createdByUser', foreignKey: 'createdBy', targetKey: 'adminUserId'})
  createdByUser: AdminUserModel;

  @BelongsTo(() => AdminUserModel, {as: 'updatedByUser', foreignKey: 'modifiedBy', targetKey: 'adminUserId'})
  updatedByUser: AdminUserModel;
}
