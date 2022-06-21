export interface PagedResponse<T>{
    page:number;
    pageSize:string;
    totalRecords:number;
    items:T;
}
  