import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserDto} from "../../../../../models/user-dto";
import {UserService} from "../../../../../services/user.service";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {Observable, of, ReplaySubject, Subject} from "rxjs";
import {map, startWith, take, takeUntil} from "rxjs/operators";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {SmallResumeDto} from "../../../../../models/resume/small-resume-dto";
import {ResumeService} from "../../../../../services/resume.service";
import {TeamDto, TeamResumeDto} from "../../../../../models/team/create-team-dto";
import {ResumeTemplateDto} from "../../../../../models/resume/resume-template-dto";
import {TeamBuildDto} from "../../../../../models/teamBuild/teamBuild-dto";
import {TeamBuildService} from "../../../../../services/teamBuild.service";

@Component({
  selector: 'cv-team-dialog',
  templateUrl: './team-dialog.component.html',
  styleUrls: ['./team-dialog.component.scss']
})
export class TeamDialogComponent implements OnInit {

  team: TeamDto = {} as TeamDto;
  resumes: SmallResumeDto[] = [];
  resumeTemplates: ResumeTemplateDto[] = [];
  teamBuilds: TeamBuildDto[] = [];

  separatorKeysCodes: number[] = [ENTER, COMMA];
  resumeCtrl = new FormControl();
  filteredResumes!: Observable<SmallResumeDto[]>;
  allResumes: SmallResumeDto[] = [];
  @ViewChild('resumeInput') resumeInput!: ElementRef<HTMLInputElement>;

  clients: UserDto[] = [];


  ngOnInit() {
  }


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<TeamDialogComponent>,
              private userService: UserService,
              private resumeService: ResumeService,
              private teamBuildService: TeamBuildService) {
    this.team = data;
    this.team.teamBuild = {} as TeamBuildDto;
    this.userService.getUsersByRole('client').subscribe(clients => {
      this.clients = clients;
    });
    this.resumeService.getAllResume().subscribe(resumes => {
      this.allResumes = resumes;
      this.filteredResumes = this.resumeCtrl.valueChanges.pipe(
        startWith(null),
        map((resumeName: string | null) => (resumeName ? this._filterResume(resumeName) : this.allResumes.slice())),
      );
    });
    this.resumeService.getAllTemplates().subscribe(templates => this.resumeTemplates = templates);
    this.teamBuildService.getAllTeamBuilds().subscribe(teamBuilds => this.teamBuilds = teamBuilds);

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
    const resumeDto = this.allResumes.filter(resume1 => resume1.id === resume.id)[0];
    const index = this.allResumes.indexOf(resumeDto);

    if (index >= 0) {
      this.allResumes.splice(index, 1);
    }
    this.filteredResumes = of(this.allResumes.filter(x=>x.id != resumeDto.id));
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.resumes.push(event.option.value);
    this.resumeInput.nativeElement.value = '';
    this.resumeCtrl.setValue(null);
  }

  private _filterResume(value: string): SmallResumeDto[] {
    const filterValue = value + '';
    return this.allResumes.filter(resume => {
      const fullName = `${resume.firstName} ${resume.lastName}`
      return fullName.toLowerCase().includes(filterValue.toLowerCase().trim())
    });
  }


  canCreate(): boolean {
    return !this.team.teamName || !this.team.clientId;
  }

  click() {
    if (!this.team.resumes)
      this.team.resumes = []

    this.resumes.forEach(resume => {
      this.team.resumes.push({resumeId: resume.id} as TeamResumeDto);
    })
    this.dialogRef.close(this.team);
  }


  teamBuildSelected() {
    this.resumeService.getAllResumesByTeamBuild(this.team.teamBuild.id).subscribe(resumes =>{
      this.resumes = resumes;
    });
  }
}
