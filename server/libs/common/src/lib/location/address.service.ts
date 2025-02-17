import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AddressModel } from '../models/location';
import {
  IAddressMaster,
  IAddressType,
  ICityVillage,
  ICountry,
  IDistrict,
  IManageAddress,
  IOption,
  IState,
} from '@vsd-common/lib';
import { CountryService } from './country.service';
import { StateService } from './state.service';
import { DistrictService } from './district.service';
import { CityVillageService } from './city-village.service';
import { AddressTypeService } from './address-type.service';
import { Transaction } from 'sequelize';

@Injectable()
export class AddressService {
  constructor(@InjectModel(AddressModel) private addressModel: typeof AddressModel,
              private countryService: CountryService,
              private stateService: StateService,
              private districtService: DistrictService,
              private cityVillageService: CityVillageService,
              private addressTypeService: AddressTypeService) {
  }

  async loadMasterData(): Promise<IAddressMaster> {
    return <IAddressMaster>{
      countries: (await this.countryService.loadAll()).map((p: ICountry) => {
        return <IOption>{ id: p.countryId, title: p.country };
      }),
      states: (await this.stateService.loadAll()).map((p: IState) => {
        return <IOption>{ id: p.stateId, title: p.state, parentId: p.countryId };
      }),
      districts: (await this.districtService.loadAll()).map((p: IDistrict) => {
        return <IOption>{ id: p.districtId, title: p.district, parentId: p.stateId };
      }),
      cityVillages: (await this.cityVillageService.loadAll()).map((p: ICityVillage) => {
        return <IOption>{ id: p.cityVillageId, title: p.cityVillage, parentId: p.districtId };
      }),
      addressTypes: (await this.addressTypeService.loadAll()).map((p: IAddressType) => {
        return <IOption>{ id: p.addressTypeId, title: p.addressType };
      }),
    };
  }

  async load() {
  }

  async getById() {
  }

  async loadDetailById(id: number) {
  }

  async manage(obj: IManageAddress, transaction: Transaction, userId: number, createdIp: string, updatedIp: string): Promise<IManageAddress> {
    const addressObj = {
      ...obj, userId,
      modifiedIp: updatedIp,
      updatedBy: userId,
    };
    if (obj.addressId) {
      const [, dataSet] = await this.addressModel.update(addressObj, {
        where: { addressId: obj.addressId },
        transaction: transaction,
        returning: true,
      });
      return dataSet[0] as IManageAddress;
    } else {
      Object.assign(addressObj, {
        createdIp: createdIp,
        createdBy: userId,
      });
      const tee = await this.addressModel.create(addressObj, { transaction: transaction });
      return tee.get({plain:true});
    }
  }

  async updateStatus() {
  }
}
