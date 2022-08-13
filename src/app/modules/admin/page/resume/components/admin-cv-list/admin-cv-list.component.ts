import {DeleteModalService} from 'src/app/services/delete-modal.service';
import {SmallResumeDto} from 'src/app/models/resume/small-resume-dto';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {ResumeService} from 'src/app/services/resume.service';
import {SnackBarService} from 'src/app/services/snack-bar.service';
import {saveAs} from 'file-saver';
import {UserRole} from 'src/app/models/users-type';
import {AccountService} from 'src/app/services/account.service';
import {FormControl} from '@angular/forms';
import {debounceTime, map, startWith, take, takeUntil} from 'rxjs/operators';
import {merge, Observable, ReplaySubject, Subject} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {PositionDto} from 'src/app/models/position/position-dto';
import {PositionService} from 'src/app/services/position.service';
import {SkillDto} from 'src/app/models/skill/skill-dto';
import {SkillService} from 'src/app/services/skill.service';
import {MatSelect} from '@angular/material/select';
import {ResumeListFilter} from 'src/app/models/resume/resume-list-filter';
import {AvailabilityStatus, AvailabilityStatusLabel,} from 'src/app/models/enums';
import {ClientsService} from '../../../../../../services/clients.service';
import {SmallClientsDto} from '../../../../../../models/clients/small-clients-dto';
import {MatButtonToggleGroup} from '@angular/material/button-toggle';
import {NgxSpinnerService} from 'ngx-spinner';
import {LoadingService} from 'src/app/services/loading.service';
import {Router} from '@angular/router';

@Component({
  selector: 'cv-admin-resume',
  templateUrl: './admin-cv-list.component.html',
  styleUrls: ['./admin-cv-list.component.scss'],
})
export class AdminCvListComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[];

  @Input() isArchive: boolean = false;
  @Input() resumes: SmallResumeDto[];
  @Input() resumesCount: number;
  @Output() refreshResumes: EventEmitter<any> = new EventEmitter<any>();
  @Input() isShowAddButton: boolean = true;
  @Input() tableHeader: string;
  @Input() url!: string;

  searchControl = new FormControl();
   isLoading = false
  positions!: PositionDto[];
  positionControl = new FormControl();
  positionFilterControl = new FormControl();
  filteredPositionsMulti: ReplaySubject<PositionDto[]> = new ReplaySubject(1);

  skills!: SkillDto[];
  skillsControl = new FormControl();
  skillFilterControl = new FormControl();
  filteredSkillsMulti: ReplaySubject<SkillDto[]> = new ReplaySubject(1);

  clients!: SmallClientsDto[];
  clientsControl = new FormControl();
  clientFilterControl = new FormControl();
  filteredClientsMulti: ReplaySubject<SmallClientsDto[]> = new ReplaySubject(1);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('positionMultiSelect', { static: true })
  positionMultiSelect: MatSelect;
  @ViewChild('skillMultiSelect', { static: true }) skillMultiSelect: MatSelect;
  @ViewChild('clientMultiSelect', { static: true })
  clientMultiSelect: MatSelect;
  public loading$!: Observable<boolean>;
  protected _onDestroy = new Subject();

  constructor(
    public loadingService: LoadingService,
    public resumeService: ResumeService,
    public deleteModalService: DeleteModalService,
    private snackService: SnackBarService,
    private accountService: AccountService,
    private positionService: PositionService,
    private skillService: SkillService,
    private clientService: ClientsService,
    private cdr: ChangeDetectorRef,
    private spinnerService: NgxSpinnerService,
    private router:Router,
  ) {}

  ngOnInit() {
    if (this.isArchive) {
      this.displayedColumns = [
        'action',
        'name',
        'position',
        'skills',
        'status',
      ];
    } else {
      this.displayedColumns = [
        'action',
        'name',
        'position',
        'skills',
        'clients',
        'salaryRate',
        'loading',
        'status',
      ];
    }

    this.positionService.getAllPositions().subscribe((positions) => {
      this.positions = positions;
      this.filteredPositionsMulti.next(this.positions.slice());

      this.positionFilterControl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterMulti(
            this.positions,
            'positionName',
            this.positionFilterControl,
            this.filteredPositionsMulti
          );
        });
    });

    this.skillService.searchSkill('').subscribe((skills) => {
      this.skills = skills;

      this.filteredSkillsMulti.next(this.skills.slice());

      this.skillFilterControl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterMulti(
            this.skills,
            'name',
            this.skillFilterControl,
            this.filteredSkillsMulti
          );
        });
    });

    this.clientService.getAllClients().subscribe((clients) => {
      this.clients = clients.items;
      this.filteredClientsMulti.next(this.clients.slice());

      this.clientFilterControl.valueChanges.subscribe(() => {
        this.filterMulti(
          this.clients,
          'fullName',
          this.clientFilterControl,
          this.filteredClientsMulti
        );
      });
    });
  }

  isSticky(buttonToggleGroup: MatButtonToggleGroup, id: string) {
    return (buttonToggleGroup.value || []).indexOf(id) !== -1;
  }

  ngAfterViewInit() {
    // If the user changes the sort order, search or filters, reset back to the first page.
    merge(
      this.sort.sortChange,
      this.searchControl.valueChanges,
      this.skillsControl.valueChanges,
      this.positionControl.valueChanges,
      this.clientsControl.valueChanges
    ).subscribe(() => (this.paginator.pageIndex = 0));

    merge(
      this.sort.sortChange,
      this.paginator.page,
      this.searchControl.valueChanges,
      this.skillsControl.valueChanges,
      this.positionControl.valueChanges,
      this.clientsControl.valueChanges
    )
      .pipe(
        startWith(''),
        debounceTime(400),
        map(() => {
          this.refreshResumes.emit(this.collectAllFilters());
        })
      )
      .subscribe();

    this.setInitialValue(this.filteredPositionsMulti, this.positionMultiSelect);
    this.setInitialValue(this.filteredSkillsMulti, this.skillMultiSelect);
    this.setInitialValue(this.filteredClientsMulti, this.clientMultiSelect);

    this.cdr.detectChanges();
  }

  deleteResume(resume: SmallResumeDto): void {
    this.deleteModalService
      .matModal('Do you want to delete resume?')
      .subscribe({
        next: (response) => {
          if (response) {
            this.resumeService.deleteResume(resume.id).subscribe({
              next: () => {
                const role = this.accountService.getStoreRole();
                if (role === UserRole.Admin) {
                  const delResume = this.resumes.find((i) => i.id == resume.id);
                  if (delResume != null) {
                    const currentDate = new Date();
                    delResume.deletedAt = currentDate.toString();
                  }
                } else {
                  this.resumes = this.resumes.filter((i) => i.id !== resume.id);
                }
                this.refreshResumes.emit(this.collectAllFilters());
              },
              error: () => {
                this.snackService.showDanger('Something went wrong');
              },
            });
          }
          return false;
        },
        error: (error) => {},
      });
  }

  getResumePdf(resume: SmallResumeDto) {
    this.isLoading = true
    this.resumeService.getResumePdfById(resume.id).subscribe((response) => {
      saveAs(response, `${resume.firstName} ${resume.lastName}.pdf`);
      this.isLoading = false
    });
  }

  getResumeDocx(resume: SmallResumeDto) {
    this.isLoading = true
    this.resumeService.getResumeDocxById(resume.id).subscribe((response) => {
      saveAs(response, `${resume.firstName} ${resume.lastName}.docx`);
      this.isLoading = false
    });
  }


  recoverResume(resume: SmallResumeDto): void {
    this.deleteModalService
      .matModal('Do you want to recover resume?')
      .subscribe({
        next: (response) => {
          if (response) {
            this.resumeService.recoverResume(resume).subscribe({
              next: () => {
                const recoverResume = this.resumes.find(
                  (i) => i.id == resume.id
                );
                if (recoverResume != null) {
                  recoverResume.deletedAt = null;
                }
                this.refreshResumes.emit(this.collectAllFilters());
              },
              error: () => {
                this.snackService.showDanger('Something went wrong');
              },
            });
          }
          return false;
        },
        error: (error) => {},
      });
  }

  copyResumeLink(url: string) {
    navigator.clipboard.writeText(
      window.location.origin + `/resume/url/${url}`
    );
    this.snackService.showSuccess('Link copied');
  }

  copyResumePdfLink(url: string) {
    navigator.clipboard.writeText(
      window.location.origin + `/resume/url/${url}/pdf`
    );
    this.snackService.showSuccess('Link copied');
  }

  copyResumeDocxLink(url: string) {
    navigator.clipboard.writeText(
      window.location.origin + `/resume/url/${url}/docx`
    );
    this.snackService.showSuccess('Link copied');
  }

  protected setInitialValue(
    filteredMulti: ReplaySubject<any>,
    multiSelect: MatSelect
  ) {
    filteredMulti.pipe(take(1), takeUntil(this._onDestroy)).subscribe(() => {
      if (multiSelect)
        multiSelect.compareWith = (a: any, b: any) => a && b && a === b;
    });
  }

  protected filterMulti(
    list: any[],
    filterFieldName: string,
    filterControl: FormControl,
    filteredMulti: ReplaySubject<any>
  ) {
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
      list.filter(
        (item) => item[filterFieldName]?.toLowerCase()?.indexOf(search) > -1
      )
    );
  }

  getAvailabilityStatusLabel(status: AvailabilityStatus): string | undefined {
    if ((status as number) === 0) {
      return 'None';
    }
    return AvailabilityStatusLabel.get(status);
  }

  private collectAllFilters(): ResumeListFilter {
    let resumeFilters: ResumeListFilter = {
      term: this.searchControl.value,
      page: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      sort: this.sort.active,
      order: this.sort.direction,
      positions: this.positionControl.value,
      skills: this.skillsControl.value,
      clients: this.clientsControl.value,
    };
    return resumeFilters;
  }

  duplicate(resume: SmallResumeDto) {
    this.resumeService.duplicateResume(resume.id).subscribe((e)=>{
      this.router.navigate([`${this.url}/resume/edit/`,e.id])
    })
  }

  ngAfterContentChecked() {
    this.loading$ = this.loadingService.isLoading$;
    this.cdr.detectChanges();
  }
  ngOnDestroy() {
    this._onDestroy.next('');
    this._onDestroy.complete();
  }
}
