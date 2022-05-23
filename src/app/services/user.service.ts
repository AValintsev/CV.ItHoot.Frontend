import {Injectable} from '@angular/core';
import {HttpInternalService} from "./http-internal.service";
import {UserDto} from "../models/user-dto";
import {Observable} from "rxjs";


@Injectable({providedIn: 'root'})
export class UserService {
  private routePrefix: string = 'user'

  constructor(private httpService: HttpInternalService) {
  }

  public getUsersByRole(roleName:string):Observable<UserDto[]>{
    return this.httpService.getRequest(this.routePrefix+`?roleName=${roleName}`)
  }

}
