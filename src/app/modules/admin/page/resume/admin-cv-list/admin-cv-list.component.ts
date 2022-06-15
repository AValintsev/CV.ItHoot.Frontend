import {SmallResumeDto} from '../../../../../models/resume/small-resume-dto';
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {ResumeService} from 'src/app/services/resume.service';
import {SnackBarService} from 'src/app/services/snack-bar.service';
import {saveAs} from 'file-saver';
import { Users } from 'src/app/models/users-type';
import { AccountService } from 'src/app/services/account.service';
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, map, startWith, switchMap, catchError} from "rxjs/operators";
import {merge, Observable, of as observableOf} from "rxjs";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {PositionDto} from "src/app/models/position/position-dto";
import {PositionService} from "src/app/services/position.service";
import {SkillDto} from "src/app/models/skill/skill-dto";
import {SkillService} from "src/app/services/skill.service";

@Component({
  selector: 'cv-admin-resume',
  templateUrl: './admin-cv-list.component.html',
  styleUrls: ['./admin-cv-list.component.scss']
})
export class AdminCvListComponent implements AfterViewInit {

  displayedColumns: string[] = ['name', 'position', 'skills', 'loading', 'status', 'action'];
  resumes: SmallResumeDto[] = [];
  searchControl = new FormControl();

  positionControl = new FormControl();
  skillsControl = new FormControl();
  positions!:PositionDto[];
  skills!:SkillDto[];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public resumeService: ResumeService,
    private snackService: SnackBarService,
    private accountService: AccountService,
    private positionService:PositionService,
    private skillService: SkillService,
  ) {
    positionService.getAllPositions().subscribe(positions => {
      this.positions = positions
    });

    skillService.searchSkill('').subscribe(skills => {
      this.skills = skills
    });
  }
  ngAfterViewInit() {
    // If the user changes the sort order, search or filters, reset back to the first page.
    merge(this.sort.sortChange, this.searchControl.valueChanges, this.skillsControl.valueChanges, this.positionControl.valueChanges)
      .subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, 
          this.paginator.page, 
          this.searchControl.valueChanges,
          this.skillsControl.valueChanges,
          this.positionControl.valueChanges)
      .pipe(
        startWith({}),
        debounceTime(400),
        switchMap(() => {
          this.isLoadingResults = true;
          var term = this.searchControl.value ?? '';
          var values = this.skillsControl.value as SkillDto[];
          console.log(values);
          return this.resumeService!.getAllResume(
            term,
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
          ).pipe(catchError(() => observableOf(null)));
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
      .subscribe(data => (this.resumes = data));
  }

  deleteResume(resume: SmallResumeDto): void {
    this.resumeService.deleteResume(resume.id).subscribe(
      {
        next: () => {
          const role = this.accountService.getStoreRole();
          if(role === Users[0]) {
            var delResume = this.resumes.find(i => i.id == resume.id);
            if (delResume != null) {
              var currentDate = new Date();
              delResume.deletedAt = currentDate.toString();
            }
          }
          else {
            this.resumes = this.resumes.filter(i => i.id !== resume.id);
          }
          this.snackService.showSuccess('Success');
        },
        error: () => {
          this.snackService.showDanger('Something went wrong');
        }
      });
  }

  getResumePdf(resume: SmallResumeDto) {
    this.resumeService.getPdf(resume.id).subscribe(response => {
      saveAs(response, `${resume.firstName} ${resume.lastName}.pdf`);
    });
  }

  recoverResume(resume: SmallResumeDto): void {
    this.resumeService.recoverResume(resume).subscribe(
      {
        next: () => {
          var recoverResume = this.resumes.find(i => i.id == resume.id);
          if (recoverResume != null) {
            recoverResume.deletedAt = null;
          }
          this.snackService.showSuccess('Success');
        },
        error: () => {
          this.snackService.showDanger('Something went wrong');
        }
      });
  }
}
