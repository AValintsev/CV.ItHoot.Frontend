
export class DraftCv implements ICv{
  name!: string;
  surname!: string;
  skills: ICvSkill[] = [];
  userLanguages: ILanguage[] = [];

  id?: number | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  deletedAt?: any;
  cvName!: string;
  isDraft!: boolean;
  userName!: string;
  lastName!: string;
  email!: string;
  site!: string;
  phone!: string;
  code!: string;
  country!: string;
  city!: string;
  street!: string;
  requiredPosition!: string;
  birthDate!: Date;
  picture!: string;
  aboutMe!: string;
  educations: IEducation[] = [];
  experiences: IExperience[] = [];
}

export interface IOrder {
  order: number;
}

export interface IExperience extends IOrder {
  id?: number;
  company: string;
  position: string;
  description: string;
  startDate?: Date;
  endDate?: Date;
}

export interface ICvSkill extends IOrder{
  id?: number;
  cvId?: number;
  skillId?: number;
  name: string;
  level?: number;
}

export interface ICvLanguage extends IOrder{
  id?: number;
  cvId?: number;
  languageId?: number;
  name: string;
  level: number;
}

export interface ILanguage extends IOrder{

  id?: number;
  name: string;
  level: number;
}

export interface IEducation extends IOrder {
  id?: number;
  institutionName: string;
  specialization: string;
  degree: string;
  description: string;
  startDate?: Date;
  endDate?: Date;
}

export interface ISkill extends IOrder {
  id?: number;
  name: string;
  level: number;
}

export interface ILevelSkill{
  SkillId?: number,
  SkillLevel: number
  ISkill: ISkill,
}

export interface ICv {
  id?: number;
  name: string;
  surname: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: any;
  cvName: string;
  isDraft: boolean;
  userName: string;
  lastName: string;
  email: string;
  site: string;
  phone: string;
  code: string;
  country: string;
  city: string;
  street: string;
  requiredPosition: string;
  birthDate: Date;
  picture: string;
  aboutMe: string;

  educations: IEducation[];
  experiences: IExperience[];

  skills: ICvSkill[];
  userLanguages: ILanguage[];

  // userLanguages: ILanguage[];
  // skills: ISkill[];
}



export interface IBaseDataModel  {
  id: number
  name: string
  description: string
}

export interface ILanguageLevel extends IBaseDataModel {

}

export interface ISkillLevel extends IBaseDataModel {

}
