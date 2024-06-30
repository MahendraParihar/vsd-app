import { IBaseAdminUser, ICommonTable } from "../base.interface";
import { IFaqCategory } from "./faq-category.interface";

export interface IBaseFaq {
  faq: string;
  faqCategoryId: number;
  answer: string;
}

export interface IManageFaq extends IBaseFaq {
  faqId?: number;
}

export interface IFaq extends IBaseFaq, ICommonTable {
  faqId: number;
  active: boolean;
}

export interface IFaqList extends IFaq {
  faqCategory: IFaqCategory;
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
