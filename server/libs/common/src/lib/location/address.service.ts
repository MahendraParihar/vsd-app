import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AddressModel } from '../models/location';
import { LabelService } from '../label';

@Injectable()
export class AddressService {
  constructor(@InjectModel(AddressModel) private addressModel: typeof AddressModel,
              private labelService: LabelService) {}

  load() {}

  getById() {}

  loadDetailById(id: number) {}

  manage() {}

  updateStatus() {}
}
