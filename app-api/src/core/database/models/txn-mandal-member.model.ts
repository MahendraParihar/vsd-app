import {BelongsTo, Column, DataType, Index, Model, Table} from 'sequelize-typescript';
import {MstMandal} from './mst-mandal.model';
import {MstPost} from './mst-post.model';
import {TxnFamily} from './txn-family.model';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'txn_mandal_member',
  timestamps: true
})
export class TxnMandalMember extends Model<TxnMandalMember> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  madalMemberId: number;

  @Index('idx-mandal-member-mandal-id')
  @BelongsTo(() => MstMandal, {
    foreignKey: 'mandalId',
    targetKey: 'mandalId',
    as: 'MandalMemberMandal'
  })
  @Column({
    allowNull: true,
  })
  mandalId: number;

  @BelongsTo(() => MstPost, {
    foreignKey: 'postId',
    targetKey: 'postId',
    as: 'MandalPost'
  })
  @Column({
    allowNull: true,
  })
  postId: number;

  @BelongsTo(() => TxnFamily, {
    foreignKey: 'familyId',
    targetKey: 'familyId',
    as: 'MandalMemberFamily'
  })
  @Column({
    allowNull: false,
  })
  familyId: number;

  @Column({
    allowNull: false,
  })
  fromYear: number;

  @Column({
    allowNull: true,
    defaultValue: null
  })
  toYear: number;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  active: boolean;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'MandalMemberCreatedBy'
  })
  @Column({
    allowNull: false,
    defaultValue: null
  })
  createdBy: number;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'MandalMemberModifiedBy'
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
