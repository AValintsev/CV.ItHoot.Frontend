import {Injectable} from "@angular/core";
import {HttpInternalService} from "./http-internal.service";
import {Observable} from "rxjs";
import {RoleDto} from "../models/users/small-user.dto";

@Injectable({providedIn: 'root'})
export class RoleService {
  private routePrefix: string = 'role'

  constructor(private httpService: HttpInternalService) {
  }



  public getAllRoles():Observable<RoleDto[]>{
    return this.httpService.getRequest(this.routePrefix)
  }
}
