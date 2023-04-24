import {IsNotEmpty} from 'class-validator';

export class AddressDto {

    @IsNotEmpty()
    tableId: number;

    @IsNotEmpty()
    pkOfTable: number;

    @IsNotEmpty()
    addressTypeId: number;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    pinCode: string;

    @IsNotEmpty()
    cityVillageId: number;

    latitude: number;
    longitude: number;
}