import { BelongsTo, Column, CreatedAt, DataType, Model, Scopes, Table, UpdatedAt } from 'sequelize-typescript';
import { AdminUserModel } from '@server/common';
import { IMediaUpload, InputLength } from '@vsd-common/lib';

@Table({
  tableName: 'txn_banner',
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
    ],
  },
}))
export class BannerModel extends Model<BannerModel> {
  @Column({
    field: 'banner_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  bannerId: number;

  @Column({
    field: 'title',
    allowNull: false,
    type: DataType.STRING(InputLength.CHAR_100),
  })
  title: string;

  @Column({
    field: 'image_path',
    allowNull: false,
    type: DataType.JSONB,
  })
  imagePath: IMediaUpload;

  @Column({
    field: 'from_date',
    allowNull: false,
    type: DataType.DATEONLY,
  })
  fromDate: Date;

  @Column({
    field: 'to_date',
    allowNull: true,
    type: DataType.DATEONLY,
  })
  toDate: Date;

  @Column({
    field: 'sub_title',
    allowNull: true,
    type: DataType.STRING(InputLength.CHAR_200),
  })
  subTitle: string;

  @Column({
    field: 'url',
    allowNull: true,
    type: DataType.STRING(InputLength.CHAR_200),
  })
  url: string;

  @Column({
    field: 'is_internal_url',
    allowNull: false,
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  isInternalUrl: boolean;

  @Column({
    field: 'banner_for',
    allowNull: false,
    defaultValue: 'home',
    type: DataType.ENUM('home', 'temple', 'mandal', 'event', 'facility', 'family', 'about_us', 'contact_us', 'term_condition'),
  })
  bannerFor: string;

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
}
