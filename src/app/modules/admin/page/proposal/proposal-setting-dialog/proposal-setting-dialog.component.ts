import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../../../services/user.service";
import {ResumeService} from "../../../../../services/resume.service";
import {ProposalDto} from "../../../../../models/proposal/proposal-dto";
import {UserDto} from "../../../../../models/user-dto";
import {ResumeTemplateDto} from "../../../../../models/resume/resume-template-dto";

@Component({
  selector: 'proposal-setting-dialog',
  templateUrl: './proposal-setting-dialog.component.html',
  styleUrls: ['./proposal-setting-dialog.component.scss']
})
export class ProposalSettingDialogComponent implements OnInit,OnDestroy {

  proposal: ProposalDto;
  clients:UserDto[] = [];
  resumeTemplates:ResumeTemplateDto[] = [];

  @ViewChild('resumeInput') resumeInput!: ElementRef<HTMLInputElement>;

  ngOnInit() {
  }


  constructor(public dialogRef: MatDialogRef<ProposalSettingDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              userService: UserService,
              resumeService:ResumeService) {
    this.proposal = data;
    userService.getUsersByRole('client').subscribe(clients=>this.clients = clients);
    resumeService.getAllTemplates().subscribe(templates => this.resumeTemplates = templates);
  }

  canUpdate() {
    return !this.proposal || !this.proposal?.client?.userId || !this.proposal.statusProposal;
  }


  compareUser(user:any, user1:any) {
    return user?.userId === user1?.userId;
  }
  ngOnDestroy() { }
}
