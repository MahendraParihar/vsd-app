import {AddressInterface} from './address.interface';

export interface TempleInterface {
    templeId: number;
    name: string;
    imagePath: string;
    address?: AddressInterface
}