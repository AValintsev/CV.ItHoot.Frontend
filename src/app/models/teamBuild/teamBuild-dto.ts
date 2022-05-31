import {TeamBuildComplexityDto} from "./teamBuildComplexity-dto";
import {TeamBuildPositionDto} from "./teamBuildPosition-dto";

export interface TeamBuildDto {
  id: number;
  projectTypeName: string;
  complexity: TeamBuildComplexityDto;
  complexityId: number;
  positions: TeamBuildPositionDto[];
}
