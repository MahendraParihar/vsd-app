import {BelongsTo, Column, CreatedAt, DataType, Index, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {MstService} from './mst-service.model';
import {MstAdminUser} from "./mst-admin-user.model";

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

  @Column({
    allowNull: false
  })
  serviceName: string;

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
    as: 'FamilyServiceCreatedBy'
  })
  @Column({
    allowNull: false,
    defaultValue: null
  })
  createdBy: number;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'FamilyServiceModifiedBy'
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
