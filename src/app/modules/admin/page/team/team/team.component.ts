import {Component, Input, OnInit} from '@angular/core';
import {StatusTeamResume, TeamDto, TeamResumeDto} from "../../../../../models/team/create-team-dto";
import {TeamService} from "../../../../../services/team.service";
import {ActivatedRoute} from "@angular/router";
import {ResumeService} from "../../../../../services/resume.service";
import {SnackBarService} from "../../../../../services/snack-bar.service";
import {MatDialog} from "@angular/material/dialog";
import {TeamPageDialogComponent} from "../team-page-dialog/team-page-dialog.component";
import {TeamPageResumeDialogComponent} from "../team-page-resume-dialog/team-page-resume-dialog.component";
import {SmallResumeDto} from "../../../../../models/resume/small-resume-dto";
import {StatusTeam} from "../../../../../models/enums";

@Component({
  selector: 'cv-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  displayedColumns: string[] = ['resumeName', 'fullName', 'position', 'skills', 'isSelected', 'action'];
  @Input()team!: TeamDto;
  StatusResume=StatusTeamResume;
  loading: boolean = false;

  constructor(private teamService: TeamService,
              private route: ActivatedRoute,
              private resumeService: ResumeService,
              private snackBarService:SnackBarService,
              public dialog: MatDialog,) {
  }

  ngOnInit(): void {}



  openTeamDialog(): void {
    const dialogRef = this.dialog.open(TeamPageDialogComponent, {
      autoFocus: false,
      width:'500px',
      data:this.team
    });

    dialogRef.afterClosed().subscribe((team: TeamDto) => {
      if (team == null)
        return;
      team.clientId = team.client.userId;
      this.teamService.updateTeam(team).subscribe(team => this.team = team);
    });
  }

  openResumeDialog():void{
    const dialogRef = this.dialog.open(TeamPageResumeDialogComponent, {
      autoFocus: false,
      width:'500px',
    });

    dialogRef.afterClosed().subscribe((resume: SmallResumeDto) => {
      if (resume == null)
        return;
      this.team.resumes.push({resumeId:resume.id} as TeamResumeDto);
      this.team.clientId = this.team.client.userId;
      this.teamService.updateTeam(this.team).subscribe(team => this.team = team);
    });
  }

  deleteResume(resume:TeamResumeDto){
    const id = this.team.resumes.indexOf(resume);
    this.teamService.updateTeam(this.team).subscribe({
      next: ()=> {
        this.team.resumes = this.team.resumes.filter((item, index) => index !== id);
        this.snackBarService.showSuccess('Deleted')
      },
      error: ()=> this.snackBarService.showDanger('Something went wrong')
    });
  }

  getStatusTeam(status:StatusTeam):string{
    switch (status){
      case StatusTeam.Created:
        return 'Created';
      case StatusTeam.InReview:
        return 'In Review';
      case StatusTeam.Approved:
        return 'Approved';
      case StatusTeam.Done:
        return 'Done';
      case StatusTeam.Denied:
        return 'Denied';
      case StatusTeam.InWorking:
        return 'In Working';
      default:
        return 'None'
    }
  }

  copyLink() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = window.location.origin+`/account/${this.team.client.shortAuthUrl}`;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.snackBarService.showSuccess('Link copied');
  }
}
