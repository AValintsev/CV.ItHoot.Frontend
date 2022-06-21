import {Component, EventEmitter, Input, OnInit, Output, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import {ProposalService} from "src/app/services/proposal.service";
import {SmallProposalDto} from "src/app/models/proposal/small-proposal-dto";
import {ProposalCreateDialogComponent} from "../proposal-create-dialog/proposal-create-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ProposalDto} from "src/app/models/proposal/proposal-dto";
import {StatusProposal} from "src/app/models/enums";
import {FormControl} from "@angular/forms";
import {merge, ReplaySubject, Subject} from "rxjs";
import {debounceTime, map, startWith, takeUntil, take} from "rxjs/operators";
import { ProposalListFilter } from 'src/app/models/proposal/proposal-list-filter';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { UserDto } from 'src/app/models/user-dto';
import {UserService} from "src/app/services/user.service";


interface ProposalStatusItem  {
  id: number;
  name: string;
}

@Component({
  selector: 'proposal-list',
  templateUrl: './proposal-list.component.html',
  styleUrls: ['./proposal-list.component.scss']
})

export class ProposalListComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['id', 'proposalName', 'clientUserName', 'proposalSize', 'showLogo', 'showContacts', 'lastUpdated', 'createdUserName', 'statusProposal', 'action'];
  
  searchControl = new FormControl();
  // proposals: SmallProposalDto[] = [];

  resultsLength = 0;
  
  @Input()proposals: SmallProposalDto[];
  @Input()proposalsCount: number;
  @Input()hideStatusFiter: boolean;
  @Output() refreshProposals: EventEmitter<any> = new EventEmitter<any>();

  clients!:UserDto[];
  clientsControl = new FormControl();
  clientFilterControl = new FormControl();
  filteredClientsMulti: ReplaySubject<UserDto[]> = new ReplaySubject(1);

  statuses!:ProposalStatusItem[];
  statusesControl = new FormControl();
  statusesFilterControl = new FormControl();
  filteredStatusesMulti: ReplaySubject<ProposalStatusItem[]> = new ReplaySubject(1);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  protected _onDestroy = new Subject();

  @ViewChild('clientsMultiSelect', { static: true }) clientMultiSelect: MatSelect;

  @ViewChild('statusMultiSelect', { static: true }) statusMultiSelect: MatSelect;

  constructor(private proposalService: ProposalService, 
              public dialog: MatDialog,
              private userService: UserService,) {
  }

  ngOnInit(): void {
    this.userService.getUsersByRole('client')
    .pipe(
      map((clients) => {
        clients.forEach((client) => { client.fullName = `${client.firstName} ${client.lastName}`; });
        return clients;
      })
    )
    .subscribe(clients => {
      this.clients = clients;
      this.filteredClientsMulti.next(this.clients.slice());
      
      this.clientFilterControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterMulti(this.clients, "fullName", this.clientFilterControl, this.filteredClientsMulti);
      });
    });

    this.statuses = this.getProposalStatusList();
    this.filteredStatusesMulti.next(this.statuses.slice());
    this.statusesFilterControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterMulti(this.statuses, "name", this.statusesFilterControl, this.filteredStatusesMulti);
      });
  }

  ngAfterViewInit() {
    // If the user changes the sort order, search or filters, reset back to the first page.
    merge(this.sort.sortChange, this.searchControl.valueChanges, this.clientsControl.valueChanges, this.statusesControl.valueChanges)
      .subscribe(() => (this.paginator.pageIndex = 0));     

    merge(this.sort.sortChange, 
          this.paginator.page, 
          this.searchControl.valueChanges,
          this.clientsControl.valueChanges,
          this.statusesControl.valueChanges)
      .pipe(
        startWith({}),
        debounceTime(400),
        map(() => {
          this.refreshProposals.emit(this.collectAllFilters());
        }),
      )
      .subscribe();

      this.setInitialValue(this.filteredClientsMulti, this.clientMultiSelect);
      this.setInitialValue(this.filteredStatusesMulti, this.statusMultiSelect);
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
        this.refreshProposals.emit(this.collectAllFilters());
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

  getProposalStatusList(): ProposalStatusItem[] {
    var statuses: ProposalStatusItem[] = [];

    var enumKeysStartIndex = Object.keys(StatusProposal).length / 2;
    var i = 0;
    for (var statusItem in StatusProposal) {
      if (i >= enumKeysStartIndex) {
        var typeStatusItem = statusItem as keyof typeof StatusProposal;
        var enn: StatusProposal = StatusProposal[typeStatusItem];
        var val = StatusProposal[typeStatusItem];
        var listItem: ProposalStatusItem = {
          id: val,
          name: this.getStatusProposal(enn)
        }
        statuses.push(listItem);
      }
      i++;
   }
   return statuses;
  }

  protected setInitialValue(filteredMulti: ReplaySubject<any>, multiSelect: MatSelect) {
    filteredMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        multiSelect.compareWith = (a: any, b: any) => a && b && a === b;
      });
  }

  private collectAllFilters() : ProposalListFilter {
    let proposalFilters: ProposalListFilter = {
      term: this.searchControl.value,
      page: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      sort: this.sort.active,
      order: this.sort.direction,
      clients: this.clientsControl.value,
      statuses: this.statusesControl.value
    };
    return proposalFilters;
  }

  protected filterMulti(list: any[], filterFieldName: string, filterControl: FormControl, filteredMulti: ReplaySubject<any>) {
    if (!list) {
      return;
    }
  
    let search = filterControl.value;
    if (!search) {
      filteredMulti.next(list.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
  
    filteredMulti.next(
      list.filter(item => item[filterFieldName].toLowerCase().indexOf(search) > -1)
    );
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
