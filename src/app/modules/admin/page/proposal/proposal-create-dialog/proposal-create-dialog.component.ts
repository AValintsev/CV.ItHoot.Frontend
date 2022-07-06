import {debounceTime, map, startWith, takeUntil} from 'rxjs/operators';
import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild,} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UserDto} from '../../../../../models/user-dto';
import {UserService} from '../../../../../services/user.service';
import {ENTER} from '@angular/cdk/keycodes';
import {UntypedFormControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {SmallResumeDto} from '../../../../../models/resume/small-resume-dto';
import {ResumeService} from '../../../../../services/resume.service';
import {ProposalDto, ProposalResumeDto,} from '../../../../../models/proposal/proposal-dto';
import {ResumeTemplateDto} from '../../../../../models/resume/resume-template-dto';
import {ProposalBuildDto} from '../../../../../models/proposal-build/proposal-build-dto';
import {ProposalBuildService} from '../../../../../services/proposal-build.service';
import {ProposalSalaryDialogComponent} from "../proposal-salary-dialog/proposal-salary-dialog.component";
import {ResumeListFilter} from "../../../../../models/resume/resume-list-filter";

@Component({
  selector: 'proposal-create-dialog',
  templateUrl: './proposal-create-dialog.component.html',
  styleUrls: ['./proposal-create-dialog.component.scss'],
})
export class ProposalCreateDialogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  proposal: ProposalDto = {} as ProposalDto;
  selectedResumes: SmallResumeDto[] = [];
  resumeTemplates: ResumeTemplateDto[] = [];
  proposalBuilds: ProposalBuildDto[] = [];
  resumes: SmallResumeDto[] = [];

  separatorKeysCodes: number[] = [ENTER];
  resumeCtrl = new UntypedFormControl();
  @ViewChild('resumeInput') resumeInput!: ElementRef<HTMLInputElement>;

  clients: UserDto[] = [];

  ngOnInit() {
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProposalCreateDialogComponent>,
    private userService: UserService,
    private resumeService: ResumeService,
    private proposalBuildService: ProposalBuildService
  ) {
    this.proposal = data;
    this.proposal.proposalBuild = {} as ProposalBuildDto;

    this.userService.getUsersByRole('client').pipe(takeUntil(this.destroy$)).subscribe((clients) => {
      this.clients = clients;
    });

    this.getAllResumes();

    this.resumeService.getAllTemplates().pipe(takeUntil(this.destroy$))
      .subscribe((templates) => (this.resumeTemplates = templates));

    this.proposalBuildService.getAllProposalBuilds().pipe(takeUntil(this.destroy$))
      .subscribe((proposalBuilds) => (this.proposalBuilds = proposalBuilds));
  }

  add(event: MatChipInputEvent): void {
    event.chipInput!.clear();
    this.resumeCtrl.setValue(null);
  }

  remove(resume: SmallResumeDto): void {
    const index = this.selectedResumes.indexOf(resume);

    if (index >= 0) {
      this.selectedResumes.splice(index, 1);
    }

  }


  selected(event: MatAutocompleteSelectedEvent): void {
    const resume = event.option.value
    if (!this.selectedResumes.includes(event.option.value)) {
      this.selectedResumes.push(resume);
    }
    this.resumeInput.nativeElement.value = '';
    this.resumeCtrl.setValue(null);
    const index = this.resumes.indexOf(resume);

    if (index >= 0) {
      this.resumes.splice(index, 1);
    }
  }

  private _filterResume(value: string) {
    const filterValue = value + '';
    const filter: ResumeListFilter = {
      term: filterValue,
      page: 0,
      pageSize: 30,
      positions:[],
      skills:[],
      sort: 'name',
      order: 'asc'
    };

    this.resumeService.getAllResume(filter).subscribe(resumes =>{
      this.resumes = resumes.items.filter(resume =>
       !this.selectedResumes.find((selectedResume) => selectedResume?.id === resume?.id)
      )
    });
  }

  canCreate(): boolean {
    return !this.proposal.proposalName || !this.proposal.clientId || !this.proposal.resumeTemplateId;
  }

  submit() {
    if (!this.proposal.resumes) this.proposal.resumes = [];

    this.selectedResumes.forEach((resume) => {
      this.proposal.resumes.push({resumeId: resume.id} as ProposalResumeDto);
    });
    this.dialogRef.close(this.proposal);
  }

  proposalBuildSelected() {
    this.resumeService
      .getAllResumesByProposalBuild(this.proposal.proposalBuild.id).pipe(
      takeUntil(this.destroy$)
    )
      .subscribe((resumes) => {
        this.selectedResumes = resumes;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  getAllResumes() {
    const filter: ResumeListFilter = {
      term: '',
      page: 0,
      pageSize: 30,
      positions:[],
      skills:[],
      sort: 'name',
      order: 'asc'
    };
    this.resumeService.getAllResume(filter).subscribe(resumes => {
      this.resumes = resumes.items;
      this.resumeCtrl.valueChanges.pipe(
        startWith(null),
        debounceTime(300),
        map((value: string | null) => {
          value = value+'';
            this._filterResume(value);
        })
      ).subscribe();
    });
  }



  openSalaryDialog(resumeDto: SmallResumeDto) {
    const resumeCopy = Object.assign({}, resumeDto);
    const dialogRef = this.dialog.open(ProposalSalaryDialogComponent, {
      autoFocus: false,
      panelClass: ['remove-style-scroll', 'change-material-style'],
      data: resumeCopy
    });

    dialogRef.afterClosed().subscribe((resume: SmallResumeDto) => {
      if (resume == null)
        return;


      this.resumeService.changeSalaryRate(resume.id, resume.salaryRate).subscribe((resume) => {
        this.remove(resumeDto);
        this.selectedResumes.push(resume);
      });
    });

  }
}
