export class AddressModel {
  addressId?: number;
  address?: string;
  country?: string;
  countryId?: number;
  state?: string;
  stateId?: number;
  districtId?: number;
  district?: string;
  cityVillage?: string;
  cityVillageId?: number;
  addressType?: string;
  addressTypeId?: number;
  latitude?: string;
  longitude?: string;
  pinCode?: string;
  tableId?: number;
  pkOfTable?: number;

  static fromJson(data: any): AddressModel | null {
    if (!data) {
      return null;
    }
    const authUserObj: AddressModel = new AddressModel();
    authUserObj.addressId = data.addressId;
    authUserObj.address = data.address;
    authUserObj.country = data.country;
    authUserObj.countryId = data.countryId;
    authUserObj.state = data.state;
    authUserObj.stateId = data.stateId;
    authUserObj.districtId = data.districtId;
    authUserObj.district = data.district;
    authUserObj.cityVillage = data.cityVillage;
    authUserObj.cityVillageId = data.cityVillageId;
    authUserObj.addressType = data.addressType;
    authUserObj.addressTypeId = data.addressTypeId;
    authUserObj.latitude = data.latitude;
    authUserObj.longitude = data.longitude;
    authUserObj.pinCode = data.pinCode;
    authUserObj.tableId = data.tableId;
    authUserObj.pkOfTable = data.pkOfTable;
    return authUserObj;
  }
}
