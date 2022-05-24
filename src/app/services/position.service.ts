import {Injectable} from "@angular/core";
import {HttpInternalService} from "./http-internal.service";
import {Observable} from "rxjs";
import {PositionDto} from "../models/resume-dto";

@Injectable({ providedIn: 'root' })
export class PositionService {
  private routePrefix: string = 'positions'
  constructor(private httpService: HttpInternalService){}


  public getAllPositions():Observable<PositionDto[]>{
    return this.httpService.getRequest<PositionDto[]>(this.routePrefix);
  }

  public createPosition(position:PositionDto):Observable<PositionDto>{
    return this.httpService.postRequest<PositionDto>(this.routePrefix,position);
  }

  public updatePosition(position:PositionDto):Observable<PositionDto>{
    return this.httpService.putRequest(this.routePrefix,position);
  }

  public deletePosition(position:PositionDto):Observable<any>{
    return this.httpService.deleteRequest(this.routePrefix+`/${position.positionId}`);
  }
}
