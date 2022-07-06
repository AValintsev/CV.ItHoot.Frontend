import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild,} from '@angular/core';
import {UntypedFormControl} from "@angular/forms";
import {catchError, debounceTime, map, startWith, switchMap} from "rxjs/operators";
import {merge, of as observableOf, Subject} from "rxjs";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SmallClientsDto} from 'src/app/models/clients/small-clients-dto';
import {ClientsListFilter} from 'src/app/models/clients/clients-list-filter';
import {ClientsService} from 'src/app/services/clients.service';
import {ClientDto} from 'src/app/models/clients/client-dto';
import {ClientCreateDialogComponent} from '../client-create-dialog/client-create-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ClientUpdateDialogComponent} from '../client-update-dialog/client-update-dialog.component';

@Component({
  selector: 'clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['fullName', 'email', 'phoneNumber', 'site', 'proposals', 'contacts', 'companyName', 'action'];
  clients: SmallClientsDto[] = [];
  searchControl = new UntypedFormControl();

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  protected _onDestroy = new Subject();

  constructor(
    public clientService: ClientsService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // If the user changes the sort order, search or filters, reset back to the first page.
    merge(this.sort.sortChange, this.searchControl.valueChanges)
      .subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange,
      this.paginator.page,
      this.searchControl.valueChanges)
      .pipe(
        startWith({}),
        debounceTime(400),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.clientService!.getAllClients(this.collectAllFilters())
            .pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.totalRecords;
          return data.items;
        }),
      )
      .subscribe(data => (this.clients = data));
  }

  private collectAllFilters(): ClientsListFilter {
    let clientsFilters: ClientsListFilter = {
      term: this.searchControl.value,
      page: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      sort: this.sort.active,
      order: this.sort.direction,
    };
    return clientsFilters;
  }

  createClientDialog(): void {
    const client = {} as ClientDto;

    const dialogRef = this.dialog.open(ClientCreateDialogComponent, {
      autoFocus: false,
      panelClass: ['remove-style-scroll', 'change-material-style'],
      data: client
    });

    dialogRef.afterClosed().subscribe((client: ClientDto) => {
      if (client == null)
        return;

        this.searchControl.setValue("");
        this.paginator.pageIndex = 0;
        this.refreshTable();
    });
  }

  refreshTable() {
    this.isLoadingResults = true;
    this.clientService!.getAllClients(this.collectAllFilters())
      .pipe(
        catchError(() => observableOf(null)),
        map(data => {

          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          this.resultsLength = data.totalRecords;
          return data.items;
        }),
      ).subscribe(data => (this.clients = data));
  }

  updateClientDialog(id: number): void {
    this.clientService.getClientById(id).subscribe((data) => {
      const dialogRef = this.dialog.open(ClientUpdateDialogComponent, {
        autoFocus: false,
        panelClass: ['remove-style-scroll', 'change-material-style'],
        data: data
      });

      dialogRef.afterClosed().subscribe((updateClient: ClientDto) => {
        if (updateClient == null)
          return;

        this.refreshTable();
      });
    });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
