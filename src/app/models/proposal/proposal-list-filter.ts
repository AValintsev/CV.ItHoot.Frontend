import {PaginationFilter} from "src/app/models/paginations/pagination-filter";

export interface ProposalListFilter extends PaginationFilter  {
  term: string;
  clients: number[];
  statuses: number[];
}

export interface UserListFilter extends PaginationFilter{
  term: string;
}
