import { SortDirection } from "@angular/material/sort";

export interface PaginationFilter{
    page: number;
    pageSize: number;
    sort: string;
    order: SortDirection;
}
