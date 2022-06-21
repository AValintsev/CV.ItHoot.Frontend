import {SmallProposalDto} from '../../../../models/proposal/small-proposal-dto';
import {Observable} from 'rxjs';
import {NavigationStart, Router} from '@angular/router';
import {AccountService} from 'src/app/services/account.service';
import {Component, OnInit} from '@angular/core';
import {Users} from 'src/app/models/users-type';
import {map, tap} from 'rxjs/operators';
import {ClientProposalService} from 'src/app/services/client/client-proposal.service';
import {ProposalResumeDto, StatusProposalResume} from 'src/app/models/proposal/proposal-dto';
import {StatusProposal} from 'src/app/models/enums';

interface IcontrolPanel{
  resumeId: number,
  proposalId: number,
  arr: ProposalResumeDto[]|[],
  component?: '',
  index:(id:number)=>number,
  prev: (component: HeaderComponent)=>void,
  next: (component: HeaderComponent)=>void,
  checkerColorArrow:(component:HeaderComponent,id:number)=>void
}

@Component({
  selector: 'cv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements OnInit {
  statusResume = StatusProposalResume
  statusProposal = StatusProposal
  Users = Users
  proposals!: Observable<SmallProposalDto[]>
  showProposalName: boolean = true
  clientName$!: Observable<string>
  notShowLeftBtnColor: boolean = true
  notShowRightBtnColor: boolean = true
  controlPanel: IcontrolPanel = {
    resumeId: 0,
    proposalId: 0,
    arr: [],
    component: '',
    index: function (id: number) {
      if (id && this.arr && this.arr.length) {
        this.resumeId = this.arr.findIndex((elem: any) => elem.id == id)
        return this.resumeId
      }
      return 0
    },

    checkerColorArrow:function (component:HeaderComponent,id:number){
      if (id && this.arr && this.arr.length) {
        // this.resumeId = this.arr.findIndex((elem: any) => elem.id == id)
        component.notShowLeftBtnColor = component.controlPanel.index(id)===0?false:true
        component.notShowRightBtnColor = (component.controlPanel.index(id)+1) === this.arr.length?false:true
      }
    },

    prev: function (component: HeaderComponent) {
      if (this.arr && this.arr.length && this.resumeId > 0) {
        component.notShowLeftBtnColor = true
        this.resumeId = this.resumeId - 1;
        component.router.navigate(['client/proposal', this.proposalId, 'resume', (this.arr[this.resumeId] as ProposalResumeDto)?.id])
        if (~(this.resumeId - 1)){
          component.notShowLeftBtnColor = true

        } else{
          component.notShowLeftBtnColor = false
        }
        component.notShowRightBtnColor = true

      }
    },
    next: function (component: HeaderComponent) {
      if (this.arr && this.arr.length && this.resumeId < this.arr.length - 1) {
        this.resumeId = this.resumeId + 1
        component.router.navigate(['client/proposal', this.proposalId, 'resume', (this.arr[this.resumeId] as ProposalResumeDto)?.id])
        component.notShowRightBtnColor = true
        component.notShowLeftBtnColor = true
        if (this.arr.length > this.resumeId + 1){
          component.notShowRightBtnColor = true
        }else{
          component.notShowRightBtnColor = false
        }
        component.notShowLeftBtnColor = true
      }
    },
  }
  constructor(
    public accountService: AccountService,
    public router: Router,
    public clientProposalService: ClientProposalService,
  ) { }

  ngOnInit(): void {
    this.checkUrlFromArrow(this.router)
    this.clientProposalService.headerTitle$.subscribe(e => {})
    this.clientName$ = this.clientProposalService.getAllProposal().pipe(map(array => array[0].clientUserName))
    this.getProposalList()
    this.clientProposalService.numberCheckedResume$.subscribe(
      response => {
        if (response?.resumeId) {
          this.controlPanel.index(response!.resumeId);
          this.controlPanel?.checkerColorArrow(this,response?.resumeId)
        }
        if (response?.proposalId) {
          this.controlPanel.proposalId = response!.proposalId
        }
      },
    )

    this.clientProposalService.headerUsersProposal$.pipe(
      tap(response => {
        if (response) {
          this.controlPanel.arr = this.filterResponseArray(response);
        }
      }),
    ).subscribe(
      {
        next: response => console.log(response),
        error: error => console.log(error)
      }
    )
    this.checkVisibleHeaderItem()
  }


private  checkUrlFromArrow(response: any) {
      let regexp = new RegExp(`/client/proposals`, 'g')
      const test = regexp.test(response.url);
      if (test) {
        this.showProposalName = true
      } else {
        this.showProposalName = false
      }
  }

  private getProposalList() {
    this.proposals = this.clientProposalService.getAllProposal()
  }
  private filterResponseArray(resumes: any): ProposalResumeDto[] {
      const arr: ProposalResumeDto[] = [];
      resumes.positionResumes.map((value: any) => {

        if (resumes.statusProposal === StatusProposal.Approved) {
          value[1].filter((e: any) => {
            if (e.statusResume == this.statusResume.Selected) {
               arr.push(e)
            }
          })
        }else{
          value[1].filter((e: any) => arr.push(e))
        }

      })
      return arr
  }




 private checkVisibleHeaderItem() {
    this.router.events.subscribe({
      next: response => {
        if (response instanceof NavigationStart) {
          this.checkUrlFromArrow(response)
        }

      },
      error: error => { console.log(error) }
    })
  }

  changeProposal(value: any) {
    this.clientProposalService.changeProposal(value.source.value)
  }

  logout() {
    this.accountService.logout().subscribe({
      next: () => this.router.navigate(['/account/login'])
    })
  }

  prevCv() {
    this.controlPanel.prev(this)
  }
  nextCv() {
    this.controlPanel.next(this)
  }

  // getProposalName() {
  //   return this.proposalName
  // }
}
