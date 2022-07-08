import {AvailabilityStatus} from "../enums";
import {SkillDto} from "../skill/skill-dto";

export interface SmallResumeDto{
  id: number;
  resumeName: string;
  positionName:string;
  isDraft: true;
  firstName: string;
  lastName: string;
  picture: string;
  salaryRate:number;
  availabilityStatus: AvailabilityStatus;
  deletedAt: string | null;
  skills:SkillDto[];
}
