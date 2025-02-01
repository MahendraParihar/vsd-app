import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey, HasMany,
  Model,
  Scopes,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import {
  AddressModel,
  AdminUserModel,
  CityVillageModel,
  CountryModel,
  DistrictModel, FamilyModel, PostModel,
  StateModel,
} from '@server/common';
import { IMandalAdditionalInfo } from '@vsd-common/lib';
import { MandalMemberModel } from './mandal-member.model';

@Table({
  tableName: 'mst_mandal',
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
        required: true,
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
      {
        model: MandalMemberModel,
        required: false,
        include: [
          {
            attributes: ['firstName', 'lastName', 'middleName', 'imagePath'],
            model: FamilyModel,
            where: { active: true },
            required: false,
            include: [
              {
                model: AddressModel,
                required: false,
                as: 'address',
                include: [
                  {
                    required: false,
                    model: CountryModel,
                  },
                ],
              },
            ],
          },
          {
            attributes: ['post'],
            where: { active: true },
            model: PostModel,
            required: false,
          },
        ],
      },
    ],
  },
  details: {
    include: [
      {
        model: AddressModel,
        required: true,
        as: 'address',
      },
      {
        model: MandalMemberModel,
        required: false,
      },
    ],
  },
  withMember: {
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
        required: true,
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
      {
        model: MandalMemberModel,
        required: false,
        include: [
          {
            attributes: ['firstName', 'lastName', 'middleName', 'imagePath'],
            model: FamilyModel,
            where: { active: true },
            required: false,
            include: [
              {
                model: AddressModel,
                required: false,
                as: 'address',
                include: [
                  {
                    required: false,
                    model: CountryModel,
                  }, {
                    required: false,
                    model: StateModel,
                  }, {
                    required: false,
                    model: DistrictModel,
                  }, {
                    required: false,
                    model: CityVillageModel,
                  },
                ],
              },
            ],
          },
          {
            attributes: ['post'],
            where: { active: true },
            model: PostModel,
            required: false,
          },
        ],
      },
    ],
  },
}))
export class MandalModel extends Model<MandalModel> {
  @Column({
    field: 'mandal_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  mandalId: number;

  @Column({
    field: 'mandal_name',
    allowNull: false,
    type: DataType.STRING(150),
  })
  mandalName: string;

  @Column({
    field: 'description',
    allowNull: true,
    type: DataType.TEXT,
  })
  description: string;

  @ForeignKey(() => AddressModel)
  @Column({
    field: 'address_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'AddressModel',
      key: 'address_id',
    },
  })
  addressId: number;

  @Column({
    field: 'image_path',
    allowNull: false,
    type: DataType.JSONB,
  })
  imagePath: object;

  @Column({
    field: 'additional_info',
    allowNull: true,
    type: DataType.JSONB,
  })
  additionalInfo: IMandalAdditionalInfo;

  @Column({
    field: 'tags',
    allowNull: true,
    type: DataType.ARRAY(DataType.STRING),
  })
  tags: string[];

  @Column({
    field: 'url',
    allowNull: true,
    type: DataType.TEXT,
  })
  url: string;

  @Column({
    field: 'meta_title',
    allowNull: true,
    type: DataType.STRING(60),
  })
  metaTitle: string;

  @Column({
    field: 'meta_description',
    allowNull: true,
    type: DataType.STRING(160),
  })
  metaDescription: string;

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

  @HasMany(() => MandalMemberModel, { as: 'mandalMembers', foreignKey: 'mandalId', sourceKey: 'mandalId' })
  mandalMembers: MandalMemberModel[];
}
