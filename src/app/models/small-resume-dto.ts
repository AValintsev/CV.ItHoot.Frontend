import {SkillTestDto} from "./resume-dto";

export interface SmallResumeDto{
  id: number;
  resumeName: string;
  isDraft: true;
  firstName: string;
  lastName: string;
  picture: string
  skills:SkillTestDto[];
}
