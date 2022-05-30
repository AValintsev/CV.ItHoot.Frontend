import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../../../services/user.service";
import {ResumeService} from "../../../../../services/resume.service";
import {TeamDto} from "../../../../../models/team/create-team-dto";
import {UserDto} from "../../../../../models/user-dto";
import {ResumeTemplateDto} from "../../../../../models/resume/resume-template-dto";

@Component({
  selector: 'cv-team-page-dialog',
  templateUrl: './team-page-dialog.component.html',
  styleUrls: ['./team-page-dialog.component.scss']
})
export class TeamPageDialogComponent implements OnInit {

  team: TeamDto;
  clients:UserDto[] = [];
  resumeTemplates:ResumeTemplateDto[] = [];

  @ViewChild('resumeInput') resumeInput!: ElementRef<HTMLInputElement>;

  ngOnInit() {
  }


  constructor(public dialogRef: MatDialogRef<TeamPageDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              userService: UserService,
              resumeService:ResumeService) {
    this.team = data;
    userService.getUsersByRole('client').subscribe(clients=>this.clients = clients);
    resumeService.getAllTemplates().subscribe(templates => this.resumeTemplates = templates);
  }

  canUpdate() {
    return !this.team || !this.team?.client?.userId || !this.team.statusTeam;
  }


  compareUser(user:any, user1:any) {
    return user?.userId === user1?.userId;
  }
}
