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
import { AdminUserModel, FaqCategoryModel } from '@server/common';
import { InputLength } from '@vsd-common/lib';

@Table({
  tableName: 'txn_faq',
  schema: 'public',
  freezeTableName: true,
  timestamps: true,
})
@Scopes(() => ({
  list: {
    include: [
      {
        attributes: ['faqCategory'],
        model: FaqCategoryModel,
        required: true,
        as: 'faqCategory',
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
export class FaqModel extends Model<FaqModel> {
  @Column({
    field: 'faq_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  faqId: number;

  @ForeignKey(() => FaqCategoryModel)
  @Column({
    field: 'faq_category_id',
    allowNull: false,
    type: DataType.INTEGER,
    references: {
      model: 'FaqCategoryModel',
      key: 'faq_category_id',
    },
  })
  faqCategoryId: number;

  @Column({
    field: 'faq',
    allowNull: false,
    type: DataType.STRING(InputLength.CHAR_500),
  })
  faq: string;

  @Column({
    field: 'answer',
    allowNull: false,
    type: DataType.TEXT,
  })
  answer: string;

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

  @BelongsTo(() => FaqCategoryModel, { as: 'faqCategory', foreignKey: 'faqCategoryId', targetKey: 'faqCategoryId' })
  faqCategory: FaqCategoryModel;
}
