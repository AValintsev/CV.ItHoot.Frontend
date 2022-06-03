import {Component, Input, OnInit} from '@angular/core';
import {ResumeDto} from "../../../../../models/resume/resume-dto";
import {TeamDto, TeamResumeDto} from "../../../../../models/team/create-team-dto";
import {saveAs} from "file-saver";
import {TeamService} from "../../../../../services/team.service";

@Component({
  selector: 'pdf-table-button',
  templateUrl: './pdf-table-button.component.html',
  styleUrls: ['./pdf-table-button.component.scss']
})
export class PdfTableButton implements OnInit {

    @Input() resume!:ResumeDto;
    @Input() team!:TeamDto;
  constructor(private teamService:TeamService) { }
  loading:boolean = false;
  ngOnInit(): void {
  }

  getPdf(){
    this.loading = true;
    this.teamService.getTeamResumePdf(this.team.id,this.resume.id).subscribe(file=>{
      saveAs(file, `${this.resume.firstName} ${this.resume.lastName}.pdf`);
      this.loading = false;
    })
  }

}
