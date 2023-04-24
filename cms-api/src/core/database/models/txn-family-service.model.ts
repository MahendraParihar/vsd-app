import {BelongsTo, Column, DataType, Index, Model, Table} from 'sequelize-typescript';
import {MstService} from './mst-service.model';
import {MstAdminUser} from "./mst-admin-user.model";
import {TxnFamily} from "./txn-family.model";

@Table({
  modelName: 'txn_family_service',
  timestamps: true
})
export class TxnFamilyService extends Model<TxnFamilyService> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  familyServiceId: number;

  @Index('idx-family-service-id')
  @BelongsTo(() => MstService, {
    foreignKey: 'serviceId',
    targetKey: 'serviceId',
    as: 'FamilyService'
  })
  @Column({
    allowNull: false,
  })
  serviceId: number;

  @Index('idx-family-family-id')
  @BelongsTo(() => TxnFamily, {
    foreignKey: 'familyId',
    targetKey: 'familyId',
    as: 'FamilyServiceFamily'
  })
  @Column({
    allowNull: false,
  })
  familyId: number;

  @Column({
    allowNull: true
  })
  jobProfile: string;

  @Column({
    allowNull: true
  })
  jobDescription: string;

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
