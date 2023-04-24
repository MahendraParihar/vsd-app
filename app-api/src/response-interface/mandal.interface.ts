import {AddressInterface} from './address.interface';

export interface MandalInterface {
    mandalId: number;
    mandal: string;
    address?: AddressInterface
}