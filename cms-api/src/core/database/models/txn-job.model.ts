import {BelongsTo, Column, DataType, Model, Table} from 'sequelize-typescript';
import {MstAdminUser} from "./mst-admin-user.model";
import {MstJobType} from "./mst-job-type.model";
import {MstJobSubCategory} from "./mst-job-sub-category.model";
import {MstJobStatus} from "./mst-job-status.model";

@Table({
  modelName: 'txn_job',
  timestamps: true
})
export class TxnJob extends Model<TxnJob> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  jobId: number;

  @BelongsTo(() => MstJobType, {
    foreignKey: 'jobTypeId',
    targetKey: 'jobTypeId',
    as: 'JobJobType'
  })
  jobTypeId: number;

  @BelongsTo(() => MstJobSubCategory, {
    foreignKey: 'jobSubCategoryId',
    targetKey: 'jobSubCategoryId',
    as: 'JobJobSubCategory'
  })
  jobSubCategoryId: number;

  @BelongsTo(() => MstJobStatus, {
    foreignKey: 'jobStatusId',
    targetKey: 'jobStatusId',
    as: 'JobJobStatus'
  })
  jobStatusId: number;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  active: boolean;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'CreatedBy'
  })
  @Column({
    allowNull: false,
    defaultValue: null
  })
  createdBy: number;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'ModifiedBy'
  })
  @Column({
    allowNull: false,
    defaultValue: null
  })
  modifiedBy: number;
}
