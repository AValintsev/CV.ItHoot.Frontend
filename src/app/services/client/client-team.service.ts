import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { TeamDto } from 'src/app/models/team/create-team-dto';
import { TeamService } from '../team.service';
import { switchMap} from 'rxjs/operators';
import { SmallTeamDto } from 'src/app/models/team/small-team-dto';

@Injectable()

export class ClientTeamService implements OnInit{
	// public team$!: Observable<TeamDto>
	private team$ = new BehaviorSubject<any>(this.teamService.getAllTeams().pipe(
		switchMap(cards => this.teamService.getTeamById(cards[0].id)))
			)
	constructor(
		private teamService: TeamService
	){

	}
	ngOnInit(){
		this.team$.subscribe(e=>console.log(e))
		// this.team$.next(this.teamService.getAllTeams().pipe(
		// 	switchMap(cards => this.teamService.getTeamById(cards[0].id)))
		// 	this.team$.subscribe(e=>{console.log('e', e)}))
	}
	changeTeam(value:number){
		
		this.team$.next(this.teamService.getTeamById(value))
	}
	getTeam(){
		return this.team$
	}
	getAllTeam():Observable<SmallTeamDto[]>{
		return this.teamService.getAllTeams()
	}
}