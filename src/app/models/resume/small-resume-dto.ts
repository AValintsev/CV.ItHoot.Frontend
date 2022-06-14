import {SkillDto} from "../skill/skill-dto";

export interface SmallResumeDto{
  id: number;
  resumeName: string;
  positionName:string;
  isDraft: true;
  firstName: string;
  lastName: string;
  picture: string;
  deletedAt: string | null
  skills:SkillDto[];
}
