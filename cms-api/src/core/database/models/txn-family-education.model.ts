import {BelongsTo, Column, DataType, Index, Model, Table} from 'sequelize-typescript';
import {TxnFamily} from './txn-family.model';
import {MstEducationDegree} from './mst-education-degree.model';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'txn_family_education',
  timestamps: true
})
export class TxnFamilyEducation extends Model<TxnFamilyEducation> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  familyEducationId: number;

  @Index('idx-family-education-family-id')
  @BelongsTo(() => TxnFamily, {
    foreignKey: 'familyId',
    targetKey: 'familyId',
    as: 'FamilyEducationFamily'
  })
  @Column({
    allowNull: false,
  })
  familyId: number;

  @BelongsTo(() => MstEducationDegree, {
    foreignKey: 'educationDegreeId',
    targetKey: 'educationDegreeId',
    as: 'FamilyEducation'
  })
  @Column({
    allowNull: false,
  })
  educationDegreeId: number;

  @Column({
    allowNull: true,
    type: DataType.FLOAT
  })
  scoredMarks: number;

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

  @Column({
    allowNull: false,
  })
  createdIp: string;

  @Column({
    allowNull: false,
  })
  modifiedIp: string;
}
