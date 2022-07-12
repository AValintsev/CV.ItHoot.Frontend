import {Component, Input, OnInit} from '@angular/core';
import {ProposalDto, ProposalResumeDto,} from '../../../../../models/proposal/proposal-dto';
import {saveAs} from 'file-saver';
import {ProposalService} from '../../../../../services/proposal.service';
import {SnackBarService} from '../../../../../services/snack-bar.service';

@Component({
  selector: 'docx-table-button',
  templateUrl: './docx-table-button.component.html',
  styleUrls: ['./docx-table-button.component.scss'],
})
export class DocxTableAction implements OnInit {
  @Input() resume!: ProposalResumeDto;
  @Input() proposal!: ProposalDto;
  constructor(
    private proposalService: ProposalService,
    private snackBarService: SnackBarService
  ) {}
  loading: boolean = false;
  ngOnInit(): void {}

  getDocx() {
    this.loading = true;
    this.proposalService.getProposalResumeDocx(this.proposal.id, this.resume.id).subscribe((file) => {
        saveAs(file, `${this.resume.firstName} ${this.resume.lastName}.docx`);
        this.loading = false;
      });
  }

  getLinkDocx() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value =
      window.location.origin + `/proposals/resume/${this.resume.shortUrl}/docx`;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.snackBarService.showSuccess('Link copied');
  }
}
