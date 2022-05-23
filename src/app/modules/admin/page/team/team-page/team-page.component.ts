import {Component, OnInit} from '@angular/core';
import {TeamService} from "../../../../../services/team.service";
import {StatusTeam, TeamDto, TeamResumeDto} from "../../../../../models/create-team-dto";
import {map} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {ResumeService} from "../../../../../services/resume.service";
import {saveAs} from "file-saver";
import {SnackBarService} from "../../../../../services/snack-bar.service";
import {MatDialog} from "@angular/material/dialog";
import {TeamPageDialogComponent} from "../team-page-dialog/team-page-dialog.component";
import {TeamPageResumeDialogComponent} from "../team-page-resume-dialog/team-page-resume-dialog.component";
import {SmallResumeDto} from "../../../../../models/small-resume-dto";

@Component({
  selector: 'cv-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {

  displayedColumns: string[] = ['resumeName', 'fullName', 'action'];
  team: TeamDto = {} as TeamDto;


  constructor(private teamService: TeamService,
              private route: ActivatedRoute,
              private resumeService: ResumeService,
              private snackBarService:SnackBarService,
              public dialog: MatDialog,) {
  }

  ngOnInit(): void {
    this.route.params.pipe(map(params => params['id'])).subscribe(id => {
      this.teamService.getTeamById(id).subscribe(team => this.team = team);
    });
  }

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

  getPdf(resume: TeamResumeDto) {
    this.resumeService.getPdf(resume.resumeId)
      .subscribe(response => saveAs(response, `${resume.firstName} ${resume.lastName}.pdf`));
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
    }
  }
}
