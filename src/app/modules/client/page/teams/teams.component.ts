import { SnackBarService } from 'src/app/services/snack-bar.service';
import { StatusTeamResume } from './../../../../models/team/create-team-dto';
import { TeamService } from './../../../../services/team.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { ModalDeleteUserComponent } from '../../component/modal-delete-user/modal-delete-user.component';
import { MatDialog } from '@angular/material/dialog';
import { TeamDto, TeamResumeDto } from 'src/app/models/team/create-team-dto';
import { map, switchMap } from 'rxjs/operators';
import { ClientTeamService } from 'src/app/services/client/client-team.service';
import * as saveAs from 'file-saver';
import { StatusTeam } from 'src/app/models/enums';

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
  //

  //
  statusResume = StatusTeamResume
  StatusTeam = StatusTeam
  teamInfoAll!: TeamDto
  teamName!: string
  statusTeam!: number
  teamPosition!:any
  checkArray: number[] = []
  cardId!: number;
  toggle = true;
  teamId!: number
  arr: { id: number, isSelected: boolean }[] = [];
  resumeArray: TeamResumeDto[] = []

  constructor(
    private dialog: MatDialog,
    public clientTeamService: ClientTeamService,
    private teamService: TeamService,
    private snackBarService:SnackBarService
  ) {

  }

  ngOnInit(): void {
    this.getResumeArray()
    this.clientTeamService.headerTitle$
  }

  getResumeArray() {
    this.clientTeamService.getTeam().subscribe({
      next: response => {
        response.subscribe({
          next: (response: TeamDto) => {
            console.log(response.positionResumes)
            this.teamName = response.teamName;
            this.clientTeamService.headerTitle$.next(this.teamName)
            this.teamInfoAll = response;
            this.resumeArray = response.resumes.filter(e => e.statusResume != this.statusResume.Denied);
            this.teamId = response.id
            this.statusTeam = response.statusTeam
            this.teamPosition = Array.from(response.positionResumes as any)
          },
          error: (error: any) => console.log(error),
        })

      },
      error: error => this.snackBarService.showDanger('Something went wrong!'),
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
        console.log(this.arr)
        if (response) {
          this.cardId = id
          this.checkArray = this.checkArray.filter(e => e != id)
          const checkExistElement = this.arr.filter(e => e.id == id)
          if (checkExistElement.length) {
            this.arr = this.arr.map(e => {
              console.log('e.id == id', e.id == id)
              if (e.id == id) {
                return { id, isSelected: false }
              }
              return e
            })
          } else {
            this.arr.push({
              id,
              isSelected: false
            })
          }
          this.resumeArray = this.resumeArray.filter(e => e.id != id)
        }
      },
      error: error => this.snackBarService.showDanger('Something went wrong!'),
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
    if (card) {
      this.resumeArray.unshift(card[0])
    }

  }
  savePdf(teamId: number, resumeId: number, firstName: string, lastName: string) {
    this.teamService.getTeamResumePdf(teamId, resumeId).subscribe(response => {
      saveAs(response, `${firstName} ${lastName}.pdf`);
    });
  }

  approveUsers() {
    const approveObject = {
      teamId: this.teamId,
      resumes: this.arr,
    }
    this.teamService.approveTeam(approveObject).subscribe({
      next: response => {
        this.snackBarService.showSuccess('Success');
        this.checkArray.length = 0;
        this.arr.length = 0;
      },
      error: error => this.snackBarService.showDanger('Something went wrong!'),
    })
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
  }
}
