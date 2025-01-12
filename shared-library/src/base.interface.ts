export interface IBaseAdminUser {
  firstName: string;
  lastName: string;
}

export interface ISocialLink {
  label: string;
  link: string;
  icon: string;
}

export interface ICommonTable {
  active: boolean;
  createdBy: number;
  createdAt: Date;
  updatedBy: number;
  updatedAt: Date;
}

export interface ICommonSEO {
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
  url?: string;
}
