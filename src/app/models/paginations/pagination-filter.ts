import {SortDirection} from "@angular/material/sort";

export interface PaginationFilter{
    page: number|null;
    pageSize: number|null;
    sort: string;
    order: SortDirection;
}
