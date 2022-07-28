import {Injectable} from '@angular/core';
import {HttpInternalService} from "./http-internal.service";
import {UserDto, UserProfileDto} from "../models/user-dto";
import {Observable} from "rxjs";
import {SmallUserDto} from "../models/users/small-user.dto";
import {PagedResponse} from "../models/paginations/paged-response";
import {UserListFilter} from "../models/proposal/proposal-list-filter";


@Injectable({providedIn: 'root'})
export class UserService {
  private routePrefix: string = 'user'

  constructor(private httpService: HttpInternalService) {
  }

  public getUsersByRole(roleName: string): Observable<UserDto[]> {
    return this.httpService.getRequest(this.routePrefix + `/role/${roleName}`)
  }

  public getAllUsers(filters: UserListFilter | null = null): Observable<PagedResponse<SmallUserDto[]>> {

    if (filters == null) {
      return this.httpService.getRequest<PagedResponse<SmallUserDto[]>>(this.routePrefix);
    } else {

      let pageNumber = 1;
      if (filters.page && filters.page > 0) {
        pageNumber = filters.page + 1;
      }

      let requestUrl = `${this.routePrefix}?term=${filters.term ?? ''}&sort=${filters.sort ?? ''}` +
        `&order=${filters.order ?? ''}&page=${pageNumber}&pageSize=${filters.pageSize}`;

      return this.httpService.getRequest<PagedResponse<SmallUserDto[]>>(requestUrl);
    }
  }

  public changeUserRole(user: SmallUserDto): Observable<SmallUserDto> {
    return this.httpService.putRequest(this.routePrefix + `/role`, {userId: user.id, roleId: user.role.id});

  }

  public getCurrentUser():Observable<UserProfileDto>{
    return this.httpService.getRequest(this.routePrefix + '/current');
  }

  public updateUserProfile(userProfile:UserProfileDto):Observable<UserProfileDto> {
  return this.httpService.putRequest(this.routePrefix , userProfile);
  }

  public createUser(user:UserProfileDto):Observable<UserDto> {
    return this.httpService.postRequest(this.routePrefix,user);
  }
}
