import { IBaseAdminUser, ICommonTable } from "../base.interface";

export interface IBaseFaqCategory {
  faqCategory: string;
  url: string;
}

export interface IManageFaqCategory extends IBaseFaqCategory {
  faqCategoryId?: number;
}

export interface IFaqCategory extends IBaseFaqCategory, ICommonTable {
  faqCategoryId: number;
  active: boolean;
}

export interface IFaqCategoryList extends IFaqCategory {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
