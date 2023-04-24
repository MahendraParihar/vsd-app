export interface AddressInterface {
    addressId: number;
    addressTypeId?: number;
    addressType?: string;
    address: string;
    cityVillage: string;
    district: string;
    state: string;
    country: string;
    pinCode: string;
    latitude?: number;
    longitude?: number;
}