import { Education } from "./education";
import { Experience } from "./experience";
import { Language } from "./language";
import { Skill } from "./skill";

export class CV {
  public id?: number;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: any;
  public cvName: string;
  public isDraft: boolean;
  public userName: string;
  public lastName: string;
  public email: string;
  public site: string;
  public phone: string;
  public code: string;
  public country: string;
  public city: string;
  public street: string;
  public requiredPosition: string;
  public birthdate: Date;
  public picture: string;
  public aboutMe: string;

  public educations: Education[];
  public experiences: Experience[];
  public userLanguages: Language[];
  public skills: Skill[];

  public constructor() {
    this.id = 0;
    this.cvName = '';
    this.isDraft = true;
    this.userName = '';
    this.lastName = '';
    this.email = '';
    this.site = '';
    this.phone = '';
    this.code = '';
    this.country = '';
    this.city = '';
    this.street = '';
    this.requiredPosition = '';
    this.birthdate = new Date;
    this.picture = '';
    this.aboutMe = '';
    this.educations = [];
    this.experiences = [];
    this.userLanguages = [];
    this.skills = [];
  }
}
