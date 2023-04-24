import {BelongsTo, Column, DataType, Model, Table} from 'sequelize-typescript';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'mst_job_category',
  timestamps: true
})
export class MstJobCategory extends Model<MstJobCategory> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  jobCategoryId: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  jobCategory: string;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  active: boolean;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'CreatedBy'
  }) @Column({allowNull: false}) createdBy: number;
  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'ModifiedBy'
  }) @Column({allowNull: false}) modifiedBy: number;
}
