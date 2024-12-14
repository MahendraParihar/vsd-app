import {BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {AddressModel, AdminUserModel, CityVillageModel, FamilyModel} from '@server/common';

@Table({
  tableName: 'txn_city_village_chovtiya',
  schema: 'public',
  freezeTableName: true,
  timestamps: true,
})
export class CityVillageChovtiyaModel extends Model<CityVillageChovtiyaModel> {
  @Column({
    field: 'city_village_chovtiya_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  city_village_chovtiya_id: number;

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
  addressId: number;

  @ForeignKey(() => FamilyModel)
  @Column({
    field: 'family_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'FamilyModel',
      key: 'family_id',
    },
  })
  familyId: number;

  @Column({
    field: 'start_date',
    allowNull: false,
    type: DataType.DATEONLY,
  })
  startDate: Date;

  @Column({
    field: 'end_date',
    allowNull: false,
    type: DataType.DATEONLY,
  })
  endDate: Date;

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
    field: 'updated_by',
    type: DataType.INTEGER,
  })
  updatedBy: number;

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

  @BelongsTo(() => AdminUserModel, {as: 'createdByUser', foreignKey: 'createdBy', targetKey: 'adminUserId'})
  createdByUser: AdminUserModel;

  @BelongsTo(() => AdminUserModel, {as: 'updatedByUser', foreignKey: 'updatedBy', targetKey: 'adminUserId'})
  updatedByUser: AdminUserModel;

  @BelongsTo(() => FamilyModel, {as: 'family', foreignKey: 'familyId', targetKey: 'familyId'})
  family: FamilyModel;

  @BelongsTo(() => CityVillageModel, {as: 'cityVillage', foreignKey: 'cityVillageId', targetKey: 'cityVillageId'})
  cityVillage: CityVillageModel;
}
