import { takeUntil } from 'rxjs/operators';
import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserDto } from '../../../../../models/user-dto';
import { UserService } from '../../../../../services/user.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { SmallResumeDto } from '../../../../../models/resume/small-resume-dto';
import { ResumeService } from '../../../../../services/resume.service';
import {
  ProposalDto,
  ProposalResumeDto,
} from '../../../../../models/proposal/proposal-dto';
import { ResumeTemplateDto } from '../../../../../models/resume/resume-template-dto';
import { ProposalBuildDto } from '../../../../../models/proposal-build/proposal-build-dto';
import { ProposalBuildService } from '../../../../../services/proposal-build.service';

@Component({
  selector: 'proposal-create-dialog',
  templateUrl: './proposal-create-dialog.component.html',
  styleUrls: ['./proposal-create-dialog.component.scss'],
})
export class ProposalCreateDialogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  proposal: ProposalDto = {} as ProposalDto;
  resumes: SmallResumeDto[] = [];
  resumeTemplates: ResumeTemplateDto[] = [];
  proposalBuilds: ProposalBuildDto[] = [];

  separatorKeysCodes: number[] = [ENTER, COMMA];
  resumeCtrl = new FormControl();
  filteredResumes!: Observable<SmallResumeDto[]>;
  allResumes: SmallResumeDto[] = [];
  @ViewChild('resumeInput') resumeInput!: ElementRef<HTMLInputElement>;

  clients: UserDto[] = [];

  ngOnInit() { }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ProposalCreateDialogComponent>,
    private userService: UserService,
    private resumeService: ResumeService,
    private proposalBuildService: ProposalBuildService
  ) {
    this.proposal = data;
    this.proposal.proposalBuild = {} as ProposalBuildDto;
    this.userService.getUsersByRole('client').pipe(
      takeUntil(this.destroy$)
    ).subscribe((clients) => {
      this.clients = clients;
    });
    this.resumeService.getAllResume().pipe(
      takeUntil(this.destroy$)
    ).subscribe((resumes) => {
      this.allResumes = resumes.items;
      this.filteredResumes = this.resumeCtrl.valueChanges.pipe(
        takeUntil(this.destroy$),
        startWith(null),
        map((resumeName: string | null) =>
          resumeName ? this._filterResume(resumeName) : this.allResumes.slice()
        )
      );
    });
    this.resumeService
      .getAllTemplates().pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((templates) => (this.resumeTemplates = templates));
    this.proposalBuildService
      .getAllProposalBuilds().pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((proposalBuilds) => (this.proposalBuilds = proposalBuilds));
  }

  add(event: MatChipInputEvent): void {
    event.chipInput!.clear();
    this.resumeCtrl.setValue(null);
  }

  remove(resume: SmallResumeDto): void {
    const index = this.resumes.indexOf(resume);

    if (index >= 0) {
      this.resumes.splice(index, 1);
    }
  }

  removeResumeFromListById(resume: SmallResumeDto): void {
    const resumeDto = this.allResumes.filter(
      (resume1) => resume1.id === resume.id
    )[0];
    const index = this.allResumes.indexOf(resumeDto);

    if (index >= 0) {
      this.allResumes.splice(index, 1);
    }
    this.filteredResumes = of(
      this.allResumes.filter((x) => x.id != resumeDto.id)
    );
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const person = event.option.value
    if (!this.resumes.includes(event.option.value)) {
      this.resumes.push(person);
    }
    this.resumeInput.nativeElement.value = '';
    this.resumeCtrl.setValue(null);
  }

  private _filterResume(value: string): SmallResumeDto[] {
    const filterValue = value + '';
    return this.allResumes.filter((resume) => {
      const fullName = `${resume.firstName} ${resume.lastName}`;
      return fullName.toLowerCase().includes(filterValue.toLowerCase().trim());
    });
  }

  canCreate(): boolean {
    return !this.proposal.proposalName || !this.proposal.clientId;
  }

  click() {
    if (!this.proposal.resumes) this.proposal.resumes = [];

    this.resumes.forEach((resume) => {
      this.proposal.resumes.push({ resumeId: resume.id } as ProposalResumeDto);
    });
    this.dialogRef.close(this.proposal);
  }

  proposalBuildSelected() {
    this.resumeService
      .getAllResumesByProposalBuild(this.proposal.proposalBuild.id).pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((resumes) => {
        this.resumes = resumes;
      });
  }
  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
