import {DeleteModalService} from 'src/app/services/delete-modal.service';
import {SmallResumeDto} from 'src/app/models/resume/small-resume-dto';
import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild,} from '@angular/core';
import {ResumeService} from 'src/app/services/resume.service';
import {SnackBarService} from 'src/app/services/snack-bar.service';
import {saveAs} from 'file-saver';
import {Users} from 'src/app/models/users-type';
import {AccountService} from 'src/app/services/account.service';
import {FormControl} from '@angular/forms';
import {debounceTime, map, startWith, take, takeUntil} from 'rxjs/operators';
import {merge, ReplaySubject, Subject} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {PositionDto} from 'src/app/models/position/position-dto';
import {PositionService} from 'src/app/services/position.service';
import {SkillDto} from 'src/app/models/skill/skill-dto';
import {SkillService} from 'src/app/services/skill.service';
import {MatSelect} from '@angular/material/select';
import {ResumeListFilter} from 'src/app/models/resume/resume-list-filter';
import {AvailabilityStatus, AvailabilityStatusLabel,} from 'src/app/models/enums';

@Component({
  selector: 'cv-admin-resume',
  templateUrl: './admin-cv-list.component.html',
  styleUrls: ['./admin-cv-list.component.scss'],
})
export class AdminCvListComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'name',
    'position',
    'skills',
    'loading',
    'status',
    'action',
  ];

  @Input() resumes: SmallResumeDto[];
  @Input() resumesCount: number;
  @Output() refreshResumes: EventEmitter<any> = new EventEmitter<any>();
  @Input() isShowAddButton: boolean = true;
  @Input() tableHeader: string;
  @Input() url!: string;

  searchControl = new FormControl();

  positions!: PositionDto[];
  positionControl = new FormControl();
  positionFilterControl = new FormControl();
  filteredPositionsMulti: ReplaySubject<PositionDto[]> = new ReplaySubject(1);

  skills!: SkillDto[];
  skillsControl = new FormControl();
  skillFilterControl = new FormControl();
  filteredSkillsMulti: ReplaySubject<SkillDto[]> = new ReplaySubject(1);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('positionMultiSelect', { static: true })
  positionMultiSelect: MatSelect;
  @ViewChild('skillMultiSelect', { static: true }) skillMultiSelect: MatSelect;

  protected _onDestroy = new Subject();

  constructor(
    public resumeService: ResumeService,
    public deleteModalService: DeleteModalService,
    private snackService: SnackBarService,
    private accountService: AccountService,
    private positionService: PositionService,
    private skillService: SkillService
  ) {
    skillService.searchSkill('').subscribe((skills) => {
      this.skills = skills;
    });
  }

  ngOnInit() {
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
  }

  ngAfterViewInit() {
    // If the user changes the sort order, search or filters, reset back to the first page.
    merge(
      this.sort.sortChange,
      this.searchControl.valueChanges,
      this.skillsControl.valueChanges,
      this.positionControl.valueChanges
    ).subscribe(() => (this.paginator.pageIndex = 0));

    merge(
      this.sort.sortChange,
      this.paginator.page,
      this.searchControl.valueChanges,
      this.skillsControl.valueChanges,
      this.positionControl.valueChanges
    )
      .pipe(
        startWith({}),
        debounceTime(400),
        map(() => {
          this.refreshResumes.emit(this.collectAllFilters());
        })
      )
      .subscribe();

    this.setInitialValue(this.filteredPositionsMulti, this.positionMultiSelect);
    this.setInitialValue(this.filteredSkillsMulti, this.skillMultiSelect);
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
                if (role === Users[0]) {
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
    this.resumeService.getPdf(resume.id).subscribe((response) => {
      saveAs(response, `${resume.firstName} ${resume.lastName}.pdf`);
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
        (item) => item[filterFieldName].toLowerCase().indexOf(search) > -1
      )
    );
  }

  getAvailabilityStatusLabel(status: AvailabilityStatus): string | undefined {
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
    };
    return resumeFilters;
  }

  ngOnDestroy() {
    this._onDestroy.next('');
    this._onDestroy.complete();
  }
}
