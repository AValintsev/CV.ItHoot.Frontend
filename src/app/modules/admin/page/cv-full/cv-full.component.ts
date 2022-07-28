import {map, pluck} from 'rxjs/operators';
import {Component, ElementRef, OnInit, ViewChild,} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ResumeService} from 'src/app/services/resume.service';
import {ResumeDto} from 'src/app/models/resume/resume-dto';
import {Observable} from 'rxjs';
import {Location} from '@angular/common'
import {ProposalService} from "../../../../services/proposal.service";
import {saveAs} from "file-saver";
import {SmallResumeDto} from "../../../../models/resume/small-resume-dto";

@Component({
  selector: 'cv-cv-full',
  templateUrl: './cv-full.component.html',
  styleUrls: ['./cv-full.component.scss'],
})
export class CvFullComponent implements OnInit {
  @ViewChild('resumeDiv') resumeId!: ElementRef;
  resume!: ResumeDto;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private resumeService: ResumeService,
    private proposalService: ProposalService,
    private location: Location
  ) {


  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params) => {
      const proposalId = params['proposalId'];
      const resumeId = params['resumeId'];
      const id = params['id'];

      if (proposalId && resumeId) {

        this.proposalService.getProposalResume(proposalId, resumeId).subscribe((data) => {
          this.resume = data.resume;
          this.resume!.showLogo = data.showLogo;
          this.resume!.resumeTemplateId = data.resumeTemplateId;

        });

      } else if (proposalId == null && resumeId) {
        this.resumeService.getResumeById(resumeId).subscribe((resume) => {
          this.resume = resume;
        });
      } else if (id) {
        this.resumeService.getResumeById(id).subscribe((resume) => {
          this.resume = resume;
        });
      }

    });

  }

  back() {
    this.location.back()
  }

  getPdf() {
    this.resumeService.getResumePdfById(this.resume.id).subscribe((response) => {
      saveAs(response, `${this.resume.firstName} ${this.resume.lastName}.pdf`);
    });
  }

  getDocx() {
    this.resumeService.getResumeDocxById(this.resume.id).subscribe((response) => {
      saveAs(response, `${this.resume.firstName} ${this.resume.lastName}.docx`);
    });
  }
}
