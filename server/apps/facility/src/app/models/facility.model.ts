import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
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
  DistrictModel,
  FamilyModel,
  PostModel,
  StateModel,
} from '@server/common';
import { FacilityMemberModel } from './facility-member.model';
import { IMediaUpload } from '@vsd-common/lib';

@Table({
  tableName: 'txn_facility',
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
        model: FacilityMemberModel,
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
        model: FacilityMemberModel,
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
          },
          {
            required: true,
            model: StateModel,
          },
          {
            required: true,
            model: DistrictModel,
          },
          {
            required: true,
            model: CityVillageModel,
          },
        ],
      },
      {
        model: FacilityMemberModel,
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
export class FacilityModel extends Model<FacilityModel> {
  @Column({
    field: 'facility_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  facilityId: number;

  @Column({
    field: 'title',
    allowNull: false,
    type: DataType.STRING(100),
  })
  title: string;

  @Column({
    field: 'description',
    allowNull: false,
    type: DataType.TEXT,
  })
  description: string;

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

  @HasMany(() => FacilityMemberModel, { as: 'facilityMembers', foreignKey: 'facilityId', sourceKey: 'facilityId' })
  facilityMembers: FacilityMemberModel[];
}
