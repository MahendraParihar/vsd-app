import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AddressModel } from '../models/location';
import { LabelService } from '../label';
import { IAddressMaster, ICountry, IOption } from '@vsd-common/lib';
import { CountryService } from './country.service';
import { StateService } from './state.service';
import { DistrictService } from './district.service';
import { CityVillageService } from './city-village.service';

@Injectable()
export class AddressService {
  constructor(@InjectModel(AddressModel) private addressModel: typeof AddressModel,
              private countries: CountryService,
              private states: StateService,
              private district: DistrictService,
              private cityVillage: CityVillageService,
              private labelService: LabelService) {
  }

  async loadMasterData(): Promise<IAddressMaster> {
    try {
      return <IAddressMaster>{
        countries: (await this.countries.loadAll()).map((p: ICountry) => {
          return <IOption>{ id: p.countryId, title: p.country };
        }),
      };
    } catch (e) {
      throw e;
    }
  }

  async load() {
  }

  async getById() {
  }

  async loadDetailById(id: number) {
  }

  async manage() {
  }

  async updateStatus() {
  }
}
