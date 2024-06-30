import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FamilyProfileModel } from '../models/family/family-profile.model';
import { IManageFamilyProfile, LabelKey } from '@vsd-common/lib';
import { LabelService } from '../label';

@Injectable()
export class FamilyProfileService {
  constructor(@InjectModel(FamilyProfileModel) private familyProfileModel: typeof FamilyProfileModel,
              private labelService: LabelService) {
  }

  async getById(id: number) {
    const obj = await this.familyProfileModel.findOne({ where: { familyProfileId: id } });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_FAMILY));
    }
    return obj;
  }

  async loadDetailById() {

  }

  async manage(id: number, obj: IManageFamilyProfile) {
    const tempObj = await this.familyProfileModel.findOne({ where: { familyProfileId: id } });
    tempObj.familyId = obj.familyId;
    tempObj.genderId = obj.genderId;
    tempObj.maritalStatusId = obj.maritalStatusId;
    tempObj.dateOfBirth = obj.dateOfBirth;
    tempObj.height = obj.height;
    tempObj.religionId = obj.religionId;
    tempObj.casteId = obj.casteId;
    tempObj.gotraId = obj.gotraId;
    tempObj.raasiId = obj.raasiId;
    tempObj.isMaglik = obj.isMaglik;
    tempObj.description = obj.description;
    tempObj.hobbies = obj.hobbies;
    tempObj.monthlyIncome = obj.monthlyIncome;
  }
}
