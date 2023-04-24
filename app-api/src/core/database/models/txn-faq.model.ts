import {BelongsTo, Column, CreatedAt, DataType, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {MstFaqCategory} from './mst-faq-category.model';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'txn_faq',
  timestamps: true
})
export class TxnFaq extends Model<TxnFaq> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  faqId: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  faq: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  faqAnswer: string;

  @BelongsTo(() => MstFaqCategory, {
    foreignKey: 'faqCategoryId',
    targetKey: 'faqCategoryId',
    as: 'FaqFaqCategory'
  })
  @Column({
    allowNull: false,
  })
  faqCategoryId: number;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  active: boolean;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'FaqCreatedBy'
  })
  @Column({
    allowNull: false,
    defaultValue: null
  })
  createdBy: number;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'FaqModifiedBy'
  })
  @Column({
    allowNull: false,
    defaultValue: null
  })
  modifiedBy: number;
}
