import { PaginationFilter } from "src/app/models/paginations/pagination-filter";

export interface ClientsListFilter extends PaginationFilter  {
  term: string;
}