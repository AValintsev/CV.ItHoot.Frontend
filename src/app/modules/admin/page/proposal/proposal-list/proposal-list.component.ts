import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProposalService} from "../../../../../services/proposal.service";
import {SmallProposalDto} from "../../../../../models/proposal/small-proposal-dto";
import {ProposalCreateDialogComponent} from "../proposal-create-dialog/proposal-create-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ProposalDto} from "../../../../../models/proposal/proposal-dto";
import {StatusProposal} from "../../../../../models/enums";


@Component({
  selector: 'proposal-list',
  templateUrl: './proposal-list.component.html',
  styleUrls: ['./proposal-list.component.scss']
})
export class ProposalListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'proposalName', 'clientUserName', 'proposalSize', 'showLogo', 'showContacts', 'lastUpdated', 'createdUserName', 'statusProposal', 'action'];
  @Input()proposals: SmallProposalDto[] = [];
  @Output() refreshProposals: EventEmitter<any> = new EventEmitter<any>();
  constructor(private proposalService: ProposalService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openProposalDialog(): void {
    const proposal = {} as ProposalDto;

    const dialogRef = this.dialog.open(ProposalCreateDialogComponent, {
      autoFocus: false,
      data: proposal
    });

    dialogRef.afterClosed().subscribe((proposal: ProposalDto) => {
      if (proposal == null)
        return;
      this.proposalService.createProposal(proposal).subscribe(() => {
        this.refreshProposals.emit(this.proposals);
      });
    });

  }

  getStatusProposal(status: StatusProposal): string {
    switch (status) {
      case StatusProposal.Created:
        return 'Created';
      case StatusProposal.InReview:
        return 'In Review';
      case StatusProposal.Approved:
        return 'Approved';
      case StatusProposal.Done:
        return 'Done';
      case StatusProposal.Denied:
        return 'Denied';
      case StatusProposal.InWorking:
        return 'In Working';
      default:
        return 'None'
    }
  }
}
