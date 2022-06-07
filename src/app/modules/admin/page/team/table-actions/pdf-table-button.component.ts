import {Component, Input, OnInit} from '@angular/core';
import {TeamDto, TeamResumeDto} from "../../../../../models/team/create-team-dto";
import {saveAs} from "file-saver";
import {TeamService} from "../../../../../services/team.service";
import {SnackBarService} from "../../../../../services/snack-bar.service";

@Component({
  selector: 'pdf-table-button',
  templateUrl: './pdf-table-button.component.html',
  styleUrls: ['./pdf-table-button.component.scss']
})
export class PdfTableButton implements OnInit {

    @Input() resume!:TeamResumeDto;
    @Input() team!:TeamDto;
  constructor(private teamService:TeamService,private snackBarService:SnackBarService) { }
  loading:boolean = false;
  ngOnInit(): void {
  }

  getPdf(){
    this.loading = true;
    this.teamService.getTeamResumePdf(this.team.id,this.resume.id).subscribe(file=>{
      saveAs(file, `${this.resume.firstName} ${this.resume.lastName}.pdf`);
      console.log(file)
      this.loading = false;
    })
  }

  getLinkPdf(){
      const selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = window.location.origin+`/teams/resume/${this.resume.shortUrl}/pdf`;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
      this.snackBarService.showSuccess('Link copied');
  }

}
