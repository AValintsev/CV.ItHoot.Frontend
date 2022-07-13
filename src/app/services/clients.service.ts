import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpInternalService} from "./http-internal.service";
import {PagedResponse} from "../models/paginations/paged-response";
import {ClientsListFilter} from 'src/app/models/clients/clients-list-filter';
import {SmallClientsDto} from 'src/app/models/clients/small-clients-dto';
import {ClientDto} from 'src/app/models/clients/client-dto';


@Injectable({ providedIn: 'root' })
export class ClientsService {
  private routePrefix: string = 'client'

  constructor(private httpService: HttpInternalService, private http: HttpClient) {
  }

  public getAllClients(filters: ClientsListFilter | null = null): Observable<PagedResponse<SmallClientsDto[]>> {

    if (filters == null) {
      return this.httpService.getRequest<PagedResponse<SmallClientsDto[]>>(this.routePrefix);
    } else {
      let requestUrl = `${this.routePrefix}?term=${filters.term ?? ''}&sort=${filters.sort}&order=${filters.order}&pageSize=${filters.pageSize}`;

      if(filters.page != null)
        requestUrl += `&page=${filters.page + 1}`;

      return this.httpService.getRequest<PagedResponse<SmallClientsDto[]>>(requestUrl);
    }
  }

  public createClient(client: ClientDto): Observable<ClientDto> {
    return this.httpService.postRequest<ClientDto>(this.routePrefix, client);
  }

  public getClientById(id: number): Observable<ClientDto> {
    return this.httpService.getRequest<ClientDto>(this.routePrefix + `/${id}`);
  }

  public updateClient(client: ClientDto): Observable<ClientDto> {
    return this.httpService.putRequest<ClientDto>(this.routePrefix, client);
  }

}
