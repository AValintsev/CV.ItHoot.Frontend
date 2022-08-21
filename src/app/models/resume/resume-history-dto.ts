import {SmallUserDto} from "../users/small-user.dto";

export interface ResumeHistoryDto{
  id: number;
  resumeId: number;
  updatedAt:Date;
  updatedUser:SmallUserDto;
  newResumeJson:string| null;
  oldResumeJson:string| null;
  status:ResumeHistoryStartStatus;
  duplicatedResumeId:number| null;
}

export enum ResumeHistoryStartStatus{
  Created = 1,
  Updated,
  Deleted,
  Recovered,
  Duplicated,
}
