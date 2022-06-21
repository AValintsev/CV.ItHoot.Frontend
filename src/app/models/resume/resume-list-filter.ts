import { PaginationFilter } from "src/app/models/paginations/pagination-filter";

export interface ResumeListFilter extends PaginationFilter  {
  term: string;
  positions: number[];
  skills: number[];
}
