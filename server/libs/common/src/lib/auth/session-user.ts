import { Ability, subject } from '@casl/ability';

export class SessionUser {
  private _id: number;
  ability: Ability;

  constructor(id: number, ability: Ability) {
    this._id = id;
    this.ability = ability;
  }

  public get id(): number {
    return this._id;
  }

  /**
   * CHECK  GENERAL PERMISSIONS
   * @param action
   * @param subject
   * @returns
   */
  public hasPermission(mPermission: string): boolean {
    if (this.isEmptyAbility()) {
      return false;
    }
    return this.ability.can(mPermission, mPermission);
  }

  /**
   * With Specific Action and Subject If User has permission on region and Product;
   */
  public hasRolePermission(mPermission: string, subObject: unknown): boolean {
    if (this.isEmptyAbility()) {
      return false;
    }
    return this.ability.can(mPermission, subject(mPermission, subObject));
  }

  public hasEntityPermission(mPermission: string, subObject: unknown): boolean {
    return this.hasRolePermission(mPermission, subObject);
  }

  private isEmptyAbility(): boolean {
    return !this.ability || Object.keys(this.ability).length === 0;
  }

  // public resetUserCache(cacheService: CacheService): void {
  //   cacheService.delete(CacheKeys.PERMISSIONS + this._id);
  //   cacheService.delete(CacheKeys.ABILITY + this._id);
  // }
}
