import { SnackBarService } from 'src/app/services/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {RoleDto, SmallUserDto} from "../../../../../models/users/small-user.dto";
import {UserService} from "../../../../../services/user.service";
import {RoleService} from "../../../../../services/role.service";
import {UntypedFormControl} from "@angular/forms";
import {merge} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {debounceTime, map, startWith} from "rxjs/operators";
import {UserListFilter} from "../../../../../models/proposal/proposal-list-filter";
import { ClientDto } from 'src/app/models/clients/client-dto';
import { ClientCreateDialogComponent } from '../../clients/client-create-dialog/client-create-dialog.component';
import { CreateUserDialogComponent } from '../create-user-dialog/create-user-dialog.component';

@Component({
  selector: 'cv-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.scss']
})
export class UserListPageComponent implements OnInit {

  displayedColumns: string[] = ['fullName', 'email', 'role', 'createdAt'];
  users:SmallUserDto[];
  roles:RoleDto[];

  userCount: number;
  searchControl = new UntypedFormControl();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isLoadingResults = true;
  isRateLimitReached = false;

  constructor(private userService:UserService,
              private roleService:RoleService,
              private dialog:MatDialog,
              private snackBar:SnackBarService,
              private snackBarService:SnackBarService) {
    userService.getAllUsers().subscribe(users => {
      this.users = users.items;
      this.userCount = users.totalRecords;
    });
    roleService.getAllRoles().subscribe(roles => this.roles = roles);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit():void{
    merge(this.sort.sortChange, this.searchControl.valueChanges).subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page, this.searchControl.valueChanges).pipe(
        startWith({}),
        debounceTime(400),
        map(() => {
          this.isLoadingResults = true;
          this.userService.getAllUsers(this.collectAllFilters()).subscribe(data=>{
            this.isLoadingResults = false;
            this.isRateLimitReached = data === null;
            this.users = data.items;
            this.userCount = data.totalRecords;
          });
        }),
      ).subscribe();
  }

  private collectAllFilters() : UserListFilter {
    return {
      term: this.searchControl.value,
      page: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      sort: this.sort.active,
      order: this.sort.direction,
    };
  }


  roleChanged(client:SmallUserDto) {
    this.userService.changeUserRole(client).subscribe(()=>{
      this.snackBarService.showSuccess('Role changed successfully');
    })
  }

  compareRoles(role1:RoleDto, role2:RoleDto){
    return role1.id === role2.id;
  }

  announceSortChange($event: Sort) {

  }

  createClientDialog(): void {
    const client = {} as ClientDto;

    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      autoFocus: false,
      panelClass: ['remove-style-scroll', 'change-material-style'],
      data: client
    });

    dialogRef.afterClosed().subscribe((client: ClientDto) => {
      if (!client)
        return;


      this.searchControl.setValue("");
      this.paginator.pageIndex = 0;
      this.snackBar.showSuccess('Saved')
      // this.refreshTable();
    });
  }

}
