import {takeUntil} from 'rxjs/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProposalService} from '../../../services/proposal.service';
import {saveAs} from 'file-saver';
import {Subject} from 'rxjs';
import {ResumeService} from "../../../services/resume.service";

@Component({
  selector: 'proposal-resume-download-page',
  templateUrl: './resume-download-page.component.html',
  styleUrls: ['./resume-download-page.component.scss'],
})
export class ResumeDownloadPageComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private proposalService: ProposalService,
    private resumeService:ResumeService,
    private router: Router
  ) {

    activatedRoute.params.subscribe((params) => {
      const proposalResumeShortUrl = params['shortUrl'];
      const resumeShortUrl = params['resumeShortUrl']
      const docType = params['docType'];
      window.self.close();

      if (proposalResumeShortUrl && docType) {
        if (docType == "docx") {
          proposalService.getProposalResumeDocxByUrl(proposalResumeShortUrl).subscribe(file => {
            saveAs(file, `resume.docx`);
            this.router.navigate(['']);
          });
        } else if (docType == "pdf") {
          proposalService.getProposalResumePdfByUrl(proposalResumeShortUrl).subscribe(file => {
            saveAs(file, `resume.pdf`);
            this.router.navigate(['']);
          });
        }
      }else if(resumeShortUrl && docType){
        if (docType == "docx") {
          resumeService.getResumeDocxByUrl(resumeShortUrl).subscribe(file => {
            saveAs(file, `resume.docx`);
            this.router.navigate(['']);
          });
        } else if (docType == "pdf") {
          resumeService.getResumePdfByUrl(resumeShortUrl).subscribe(data => {
            // var file = new Blob([data.blob()], {type: 'application/pdf'});
            // var fileURL = window.URL.createObjectURL(data);
            // window.open(fileURL,'_self');
            saveAs(data, `resume.pdf`);
            this.router.navigate(['']);
          });
        }
      }
    });
  }

  ngOnInit(): void {
  }

}
