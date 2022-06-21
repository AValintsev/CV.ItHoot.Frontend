import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProposalService} from "../../../services/proposal.service";
import {saveAs} from "file-saver";

@Component({
  selector: 'proposal-resume-download-page',
  templateUrl: './proposal-resume-download-page.component.html',
  styleUrls: ['./proposal-resume-download-page.component.scss']
})
export class ProposalResumeDownloadPageComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private proposalService: ProposalService,
              private router:Router) {
    activatedRoute.params.subscribe(params => {
      const shortUrl = params['shortUrl'];
      window.self.close();

      if (shortUrl) {
        proposalService.getProposalResumePdfByUrl(shortUrl).subscribe((response) => {
          saveAs(response, `resume.pdf`);
          this.router.navigate(['']);
        });
      }
    });
  }

  ngOnInit(): void {
  }

}
