import { TeamService } from './../../../../services/team.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { ModalDeleteUserComponent } from '../../component/modal-delete-user/modal-delete-user.component';
import { MatDialog } from '@angular/material/dialog';
import { TeamDto, TeamResumeDto } from 'src/app/models/team/create-team-dto';
import { map, switchMap } from 'rxjs/operators';
import { ClientTeamService } from 'src/app/services/client/client-team.service';

@Component({
  selector: 'cv-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
  animations: [
    trigger('hidden', [
      state('start', style({})),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300)
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(300, style({
          opacity: 0
        }))
      ])
    ])],

})
export class TeamsComponent implements OnInit {
  cards$!: Observable<TeamDto>
  checkArray: number[] = []
  cardId!: number;
  toggle = true;
  teamId!: number
  arr: { id: number, isSelected: boolean }[] = [];
  resumeArray: TeamResumeDto[] = []

  constructor(
    private dialog: MatDialog,
    private clientTeamService: ClientTeamService,
    ) {
      
     }

  ngOnInit(): void {

    this.getResumeArray()
  }

  getResumeArray() {
    this.clientTeamService.getTeam().subscribe({
      next: response => {
        response.subscribe({
          next: (response: TeamDto)=>{
               this.resumeArray = response.resumes;
        this.teamId = response.id
          },
          error: (error:any) => console.log(error),
        })
     
      },
      error: error => console.log(error),
    })
  }
  deleteCard(id: number, event: Event) {
    event.stopPropagation()
    let dialogRef = this.dialog.open(ModalDeleteUserComponent, {
      height: '150px',
      width: '300px',
    });
    dialogRef.afterClosed().subscribe({
      next: response => {
        if (response) {
          this.cardId = id
          this.checkArray = this.checkArray.filter(e => e != id)
          this.arr = this.arr.filter(e => e.id != id)
          this.resumeArray = this.resumeArray.filter(e => e.id != id)
        }
      },
      error: error => console.log(error),
    })

  }
  calcTransform(i: number, item: number) {
    if (item <= 5) {
      return -60 * i
    } else if (item <= 10) {
      return -75 * i
    } else if (item <= 15) {
      return -85 * i
    } else if (item <= 20) {
      return -91 * i
    } else {
      return -94 * i
    }
  }

  showCard(i: number) {
    const card = this.resumeArray.splice(i, 1)
    console.log(card)
    if (card) {
      this.resumeArray.unshift(card[0])
    }

  }

  //   {
  //   "teamId": 12,
  //     "resumes": [
  //       {
  //         "id": 1,
  //         "isSelected": false
  //       }
  //     ]
  // }

  approveUsers(){

  }

  checkSelect(id: number) {
    return this.checkArray.filter(e => e == id).length
  }
  selectToggler(id: number, select: boolean, index: number, event: Event) {
    event.stopPropagation()
    if (select && index == 0) {
      if (!this.arr.filter(e => e.id == id).length) {
        this.checkArray.push(id)
        this.arr.push({
          id,
          isSelected: true
        })
      }
    }
    console.log(this.arr)
  }
}
