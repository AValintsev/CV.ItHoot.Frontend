import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { state, transition, trigger, style, animate } from '@angular/animations';
import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as saveAs from 'file-saver';
import { StatusTeam } from 'src/app/models/enums';
import { StatusTeamResume, TeamApprove, TeamApproveResume, TeamDto, TeamResumeDto } from 'src/app/models/team/create-team-dto';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { TeamService } from 'src/app/services/team.service';
import { ModalDeleteUserComponent } from '../../component/modal-delete-user/modal-delete-user.component';
import { ClientTeamService } from 'src/app/services/client/client-team.service';


@Component({
  selector: 'cv-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
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
export class TeamComponent implements OnInit, OnChanges {
  StatusTeam = StatusTeam
  statusResume = StatusTeamResume
  status = 1;
  statusUserCard:number[]=[]
  cardId!: number;
  approveObject: TeamApprove = { teamId: 0, resumes: [] }
  toggleBtn = true;
  @Input() checkArrayAll: number[] = []
   checkArray: number[] = []
  @Input() resumeArray: any = []
  @Input() teamId!: number
  @Input() statusObject!: TeamApprove
  @Input() statusArray: { id: number, isSelected: boolean }[] = [];
  @Input() set statusTeam(status: number) {
    this.status = status;
  }
  @Output() statusChang = new EventEmitter()
  constructor(
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
    private teamService: TeamService,
    private clientTeamService: ClientTeamService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  checkSelectedResume(status: TeamResumeDto[]){
    return status.filter(resume => resume.statusResume === this.statusResume.Selected).length
}

  deleteCard(id: number, event: Event, index: number, length: number) {
    event.stopPropagation()
    let dialogRef = this.dialog.open(ModalDeleteUserComponent, {
      height: '150px',
      width: '300px',
    });
    dialogRef.afterClosed().subscribe({
      next: response => {

        if (response && (index == 0 || index == length || !this.toggleBtn)) {
          this.cardId = id
          this.resumeArray[1] = this.resumeArray[1].filter((resume: any) => resume.id !== id)
          this.checkArray = this.checkArray.filter(e => e != id)
          this.checkArrayAll = this.checkArrayAll.filter(e => e != id)
          const checkExistElement = this.statusObject?.resumes?.filter(e => e.id == id)
          if (checkExistElement.length) {
            this.statusObject.resumes = this.statusObject.resumes?.map(e => {
              if (e.id == id) {
                return { id, isSelected: false }
              }
              return e
            })
          } else {
            this.statusObject.resumes.push({
              id,
              isSelected: false
            })
          }
          this.approveUsers(this.statusObject.resumes, this.checkArrayAll)
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
    const card = this.resumeArray[1].splice(i, 1)
    if (card) {
      this.resumeArray[1].unshift(card[0])
    }

  }
  savePdf(teamId: number, resumeId: number, firstName: string, lastName: string) {
    this.teamService.getTeamResumePdf(teamId, resumeId).subscribe(response => {
      saveAs(response, `${firstName} ${lastName}.pdf`);
    });
  }

  approveUsers(statusObject: TeamApproveResume[], checkArrayAll:number[]) {
    const approveObject = {
      teamId: this.teamId,
      resumes: this.statusObject.resumes,
    }
    this.statusChang.emit([approveObject, checkArrayAll])
  }

  checkSelect(id: number) {
    return this.checkArray.includes(id)
  }

  selectToggle(id: number, select: boolean, index: number, event: Event, length: number) {
    event.stopPropagation()
    if (select && (index == 0 || index == length || !this.toggleBtn)) {
      if (!this.statusObject.resumes.filter(e => e.id == id).length) {
        this.checkArray.push(id)
        this.checkArrayAll.push(id)
        this.statusObject.resumes.push({
          id,
          isSelected: true
        })
        this.approveUsers(this.statusObject.resumes,this.checkArrayAll)
      }
    }
  }

  navigateToResume(teamId: number, resumeId: number) {
    this.router.navigate(['client/team', teamId, 'resume', resumeId])
    this.clientTeamService.numberCheckedResume$.next({
      teamId,
      resumeId
    })
  }

  chechVisibleCardLine(resumeArray: TeamResumeDto[]){
    return resumeArray.filter(resume => resume.statusResume !== this.statusResume.Denied).length
  }


  ngOnChanges(changes: SimpleChanges): void {

  }
}
