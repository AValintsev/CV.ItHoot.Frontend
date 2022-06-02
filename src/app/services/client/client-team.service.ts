import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { TeamDto, TeamResumeDto } from 'src/app/models/team/create-team-dto';
import { TeamService } from '../team.service';
import { map, switchMap, tap} from 'rxjs/operators';
import { SmallTeamDto } from 'src/app/models/team/small-team-dto';

@Injectable()

export class ClientTeamService implements OnInit{
	Map: any = new Map()
	resumes: any;
	public headerTitle$ = new BehaviorSubject<string|null>(null)
	private team$ = new BehaviorSubject<any>(this.teamService.getAllTeams().pipe(
		switchMap(cards => this.getTeamById(cards[0].id)))
			)
	constructor(
		private teamService: TeamService
	){

	}
	ngOnInit(){

	}
	changeTeam(value:number){
		this.team$.next(this.getTeamById(value))
	}
	getTeam(){
		return this.team$
	}
	getAllTeam():Observable<SmallTeamDto[]>{
		return this.teamService.getAllTeams()
	}
	getTeamById(value:number){
	   return	this.teamService.getTeamById(value).pipe(
			tap(array=>{
				// console.log('get team by id',array)
			   array.resumes.forEach((resume:any, index:number)=>{
					if (this.Map.get(resume)){
						const resumes = this.Map.get(resume.positionName)
						resumes.push(resume)
					}else{
						this.Map.set(resume.positionName,[resume])
					}
				})
				array.positionResumes = this.Map
			
			}),
			map(array=>{
	
				array.resumes.forEach((resume: any, index: number) => {
					if (this.Map.get(resume)) {
						const resumes = this.Map.get(resume.positionName)
						resumes.push(resume)
					} else {
						this.Map.set(resume.positionName, [resume])
					}
				})
				array.positionResumes = this.Map
				return array
			
			})
		)
	}
}