import {MstAddiction} from "../../core/database/models/mst-addiction.model";
import {MstBusiness} from "../../core/database/models/mst-business.model";
import {MstCityVillage} from "../../core/database/models/mst-city-village.model";
import {MstCountry} from "../../core/database/models/mst-country.model";
import {MstDistrict} from "../../core/database/models/mst-district.model";
import {MstFaqCategory} from "../../core/database/models/mst-faq-category.model";
import {MstGender} from "../../core/database/models/mst-gender.model";
import {MstGotra} from "../../core/database/models/mst-gotra.model";
import {MstJobCategory} from "../../core/database/models/mst-job-category.model";
import {MstJobSubCategory} from "../../core/database/models/mst-job-sub-category.model";
import {MstJobType} from "../../core/database/models/mst-job-type.model";
import {MstPost} from "../../core/database/models/mst-post.model";
import {MstRelation} from "../../core/database/models/mst-relation.model";
import {MstReligion} from "../../core/database/models/mst-religion.model";
import {MstService} from "../../core/database/models/mst-service.model";
import {MstState} from "../../core/database/models/mst-state.model";
import {
  ADDICTION_REPOSITORY,
  BUSINESS_REPOSITORY,
  CITY_VILLAGE_REPOSITORY,
  COUNTRY_REPOSITORY,
  DISTRICT_REPOSITORY,
  FAQ_CATEGORY_REPOSITORY,
  GENDER_REPOSITORY,
  GOTRA_REPOSITORY,
  JOB_CATEGORY_REPOSITORY,
  JOB_SUB_CATEGORY_REPOSITORY,
  JOB_TYPE_REPOSITORY,
  POST_REPOSITORY,
  RELATION_REPOSITORY,
  RELIGION_REPOSITORY,
  SERVICE_REPOSITORY,
  STATE_REPOSITORY
} from "../../constants/config-constants";

export const lovProvider = [
  {
    provide: ADDICTION_REPOSITORY,
    useValue: MstAddiction
  },
  {
    provide: BUSINESS_REPOSITORY,
    useValue: MstBusiness
  },
  {
    provide: CITY_VILLAGE_REPOSITORY,
    useValue: MstCityVillage
  },
  {
    provide: DISTRICT_REPOSITORY,
    useValue: MstDistrict
  },
  {
    provide: COUNTRY_REPOSITORY,
    useValue: MstCountry
  },
  {
    provide: STATE_REPOSITORY,
    useValue: MstState
  },
  {
    provide: FAQ_CATEGORY_REPOSITORY,
    useValue: MstFaqCategory
  },
  {
    provide: JOB_CATEGORY_REPOSITORY,
    useValue: MstJobCategory
  },
  {
    provide: JOB_TYPE_REPOSITORY,
    useValue: MstJobType
  },
  {
    provide: JOB_SUB_CATEGORY_REPOSITORY,
    useValue: MstJobSubCategory
  },
  {
    provide: GENDER_REPOSITORY,
    useValue: MstGender
  },
  {
    provide: GOTRA_REPOSITORY,
    useValue: MstGotra
  },
  {
    provide: RELIGION_REPOSITORY,
    useValue: MstReligion
  },
  {
    provide: RELATION_REPOSITORY,
    useValue: MstRelation
  },
  {
    provide: POST_REPOSITORY,
    useValue: MstPost
  },
  {
    provide: SERVICE_REPOSITORY,
    useValue: MstService
  }
];
