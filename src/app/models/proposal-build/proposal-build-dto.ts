import {ProposalBuildComplexityDto} from "./proposal-build-complexity-dto";
import {ProposalBuildPositionDto} from "./proposal-build-position-dto";

export interface ProposalBuildDto {
  id: number;
  projectTypeName: string;
  estimation:number;
  complexity: ProposalBuildComplexityDto;
  complexityId: number;
  positions: ProposalBuildPositionDto[];
}
