import {BelongsTo, Column, CreatedAt, DataType, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'mst_faq_category',
  timestamps: true
})
export class MstFaqCategory extends Model<MstFaqCategory> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  faqCategoryId: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true
  })
  faqCategory: string;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  active: boolean;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'FaqCategoryCreatedBy'
  })
  @Column({allowNull: false})
  createdBy: number;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'FaqCategoryModifiedBy'
  })
  @Column({allowNull: false})
  modifiedBy: number;
}
