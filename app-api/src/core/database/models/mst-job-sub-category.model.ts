import {BelongsTo, Column, CreatedAt, DataType, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'mst_job_sub_category',
  timestamps: true
})
export class MstJobSubCategory extends Model<MstJobSubCategory> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  jobSubCategoryId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  jobCategoryId: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  jobSubCategory: string;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  active: boolean;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'JobSubCategoryCreatedBy'
  }) @Column({allowNull: false}) createdBy: number;
  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'JobSubCategoryModifiedBy'
  }) @Column({allowNull: false}) modifiedBy: number;
}
