import {Inject, Injectable} from '@nestjs/common';
import {ADDRESS_REPOSITORY,} from '../../core/constants/config-constants';
import {TxnAddress} from '../../core/database/models/txn-address.model';
import {MstCityVillage} from '../../core/database/models/mst-city-village.model';
import {MstDistrict} from '../../core/database/models/mst-district.model';
import {MstState} from '../../core/database/models/mst-state.model';
import {MstCountry} from '../../core/database/models/mst-country.model';
import {AddressInterface} from '../../response-interface/address.interface';

@Injectable()
export class CommonService {

    constructor(@Inject(ADDRESS_REPOSITORY) private readonly addressRepository: typeof TxnAddress) {

    }

    public async findAddress(tableIdIn: number, pkOfTableIn: number): Promise<AddressInterface> {
        try {
            const addressObj = await this.addressRepository.findOne<TxnAddress>({
                where: {
                    active: true,
                    tableId: tableIdIn,
                    pkOfTable: pkOfTableIn
                },
                include: [
                    {
                        model: MstCityVillage,
                        required: true,
                        attributes: ['cityVillage'],
                        include: [
                            {
                                model: MstDistrict,
                                required: true,
                                attributes: ['district'],
                                include: [
                                    {
                                        model: MstState,
                                        required: true,
                                        attributes: ['state'],
                                        include: [
                                            {
                                                model: MstCountry,
                                                required: true,
                                                attributes: ['country']
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });

            if (!addressObj) {
                return null;
            }

            const iAddressObj: AddressInterface = {
                addressId: addressObj['dataValues']['addressId'],
                addressTypeId: addressObj['dataValues']['addressTypeId'],
                address: addressObj['dataValues']['address'],
                cityVillage: addressObj['AddressCityVillage']['dataValues']['cityVillage'],
                district: addressObj['AddressCityVillage']['CityVillageDistrict']['dataValues']['district'],
                state: addressObj['AddressCityVillage']['CityVillageDistrict']['DistrictState']['dataValues']['state'],
                country: '',
                pinCode: addressObj['dataValues']['pinCode'],
                latitude: addressObj['dataValues']['latitude'],
                longitude: addressObj['dataValues']['longitude']
            };
            return iAddressObj;

        } catch (e) {
            console.log(e);
            return null;
        }
    }

    public async findAddressById(addressIdIn: number): Promise<AddressInterface> {
        console.log(addressIdIn);
        try {
            const addressObj = await this.addressRepository.findOne<TxnAddress>({
                where: {
                    active: true,
                    addressId: addressIdIn
                },
                include: [
                    {
                        model: MstCityVillage,
                        required: true,
                        attributes: ['cityVillage'],
                        include: [
                            {
                                model: MstDistrict,
                                required: true,
                                attributes: ['district'],
                                include: [
                                    {
                                        model: MstState,
                                        required: true,
                                        attributes: ['state'],
                                        include: [
                                            {
                                                model: MstCountry,
                                                required: true,
                                                attributes: ['country']
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });

            if (!addressObj) {
                return null;
            }

            const iAddressObj: AddressInterface = {
                addressId: addressObj['dataValues']['addressId'],
                addressTypeId: addressObj['dataValues']['addressTypeId'],
                address: addressObj['dataValues']['address'],
                cityVillage: addressObj['AddressCityVillage']['dataValues']['cityVillage'],
                district: addressObj['AddressCityVillage']['CityVillageDistrict']['dataValues']['district'],
                state: addressObj['AddressCityVillage']['CityVillageDistrict']['DistrictState']['dataValues']['state'],
                country: '',
                pinCode: addressObj['dataValues']['pinCode'],
                latitude: addressObj['dataValues']['latitude'],
                longitude: addressObj['dataValues']['longitude']
            };
            return iAddressObj;

        } catch (e) {
            console.log(e);
            return null;
        }
    }

    public async addAddress(addressObj: any): Promise<TxnAddress> {

        try {
            const createdObj = await this.addressRepository.create(addressObj);
            if (createdObj) {
                return createdObj;
            } else {
                return null;
            }
        } catch (e) {
            return null;
        }
    }


}
