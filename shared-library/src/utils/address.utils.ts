import { IAddressDetail } from '../location';

export function convertAddress(address: IAddressDetail) {
  return `${address.address}, ${address.cityVillage}, ${address.district}, ${address.state}, ${address.country} ${address.pinCode}`
}
