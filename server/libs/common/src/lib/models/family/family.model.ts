import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Scopes,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { AdminUserModel } from '../admin';
import { IMediaUpload } from '@vsd-common/lib';
import { AddressModel, CityVillageModel, CountryModel, DistrictModel, StateModel } from '../location';

@Table({
  tableName: 'txn_family',
  schema: 'public',
  freezeTableName: true,
  timestamps: true,
})
@Scopes(() => ({
  list: {
    include: [
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
      {
        model: AddressModel,
        required: false,
        as: 'address',
        include: [
          {
            required: true,
            model: CountryModel,
          }, {
            required: true,
            model: StateModel,
          }, {
            required: true,
            model: DistrictModel,
          }, {
            required: true,
            model: CityVillageModel,
          },
        ],
      },
    ],
  },
}))
export class FamilyModel extends Model<FamilyModel> {
  @Column({
    field: 'family_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  familyId: number;

  @Column({
    field: 'first_name',
    allowNull: false,
    type: DataType.STRING(50),
  })
  firstName: string;

  @Column({
    field: 'middle_name',
    allowNull: false,
    type: DataType.STRING(50),
  })
  middleName: string;

  @Column({
    field: 'last_name',
    allowNull: false,
    type: DataType.STRING(50),
  })
  lastName: string;

  @Column({
    field: 'email_id',
    allowNull: false,
    type: DataType.STRING(100),
  })
  emailId: string;

  @Column({
    field: 'image_path',
    allowNull: true,
    type: DataType.JSONB,
  })
  imagePath: IMediaUpload[];

  @Column({
    field: 'visited_count',
    allowNull: false,
    defaultValue: 0,
    type: DataType.NUMBER,
  })
  visitedCount: number;

  @ForeignKey(() => AddressModel)
  @Column({
    field: 'address_id',
    allowNull: true,
    type: DataType.NUMBER,
    references: {
      model: 'AddressModel',
      key: 'address_id',
    },
  })
  addressId: number;

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

  @BelongsTo(() => AdminUserModel, { as: 'createdByUser', foreignKey: 'createdBy', targetKey: 'adminUserId' })
  createdByUser: AdminUserModel;

  @BelongsTo(() => AdminUserModel, { as: 'updatedByUser', foreignKey: 'updatedBy', targetKey: 'adminUserId' })
  updatedByUser: AdminUserModel;

  @BelongsTo(() => AddressModel, { as: 'address', foreignKey: 'addressId', targetKey: 'addressId' })
  address: AddressModel;
}
