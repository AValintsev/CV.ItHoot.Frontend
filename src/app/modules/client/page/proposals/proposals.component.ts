import { Router, NavigationStart } from '@angular/router';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { StatusProposalResume, ProposalApprove, ProposalResumeDto } from '../../../../models/proposal/proposal-dto';
import { ProposalService } from '../../../../services/proposal.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProposalDto} from 'src/app/models/proposal/proposal-dto';
import { ClientProposalService } from 'src/app/services/client/client-proposal.service';
import { StatusProposal } from 'src/app/models/enums';

@Component({
  selector: 'cv-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.scss'],
})

export class ProposalsComponent implements OnInit {
  statusResume = StatusProposalResume
  StatusProposal = StatusProposal
  proposalName!: string
  statusProposal: number = 1
  checkArrayAll: number[] = []
  statusObject: ProposalApprove = { proposalId: 0, resumes: [] }
  resume: any = []
  proposalId!: number


  constructor(
    private dialog: MatDialog,
    public clientProposalService: ClientProposalService,
    private proposalService: ProposalService,
    private snackBarService: SnackBarService,
    private router:Router
  ) {

  }

  ngOnInit(): void {
    this.getResumeArray()
  }


  statusChang(arr: [ProposalApprove, number[]]) {
      this.statusObject = arr[0];
      this.checkArrayAll = arr[1]
  }
objZeroing(){
  this.statusObject = { proposalId: 0, resumes: [] }
  this.checkArrayAll.length = 0
}

  getResumeArray(id:number|null=null) {
    this.clientProposalService.getProposal().subscribe({
      next: response => {
        response.subscribe({
          next: (response: ProposalDto) => {
            this.statusProposal = response.statusProposal
            this.resume = this.filterResponseArray(response)
            this.proposalId = response.id;
            this.clientProposalService.headerTitle$.next(response.proposalName)
            this.objZeroing()
          },
          error: () => this.snackBarService.showDanger('Something went wrong!'),
        })

      },
      error: () => this.snackBarService.showDanger('Something went wrong!'),
    })
  }
  filterResponseArray(resumes:any){
    let array = Array.from(resumes.positionResumes as any);
    return array.map((value: any) =>{
      if (resumes.statusProposal === StatusProposal.Approved){
        return [value[0], value[1].filter((e: any) => e.statusResume==this.statusResume.Selected)]
      } else{
         return value
      }


    })

  }
  approveUsers() {
    this.proposalService.approveProposal(this.statusObject).subscribe({
      next: response => {
        this.getResumeArray(this.proposalId)
        this.objZeroing()
      },
      error: () => this.snackBarService.showSuccess('Success')
    }
  )

  }
}
