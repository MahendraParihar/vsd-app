export interface IAddress {
  addressId: number;
  addressTypeId?: number;
  addressType?: string;
  address: string;
  cityVillageId?: number;
  cityVillage: string;
  districtId?: number;
  district: string;
  stateId?: number;
  state: string;
  countryId?: number;
  country: string;
  pinCode: string;
  latitude?: number;
  longitude?: number;
}
