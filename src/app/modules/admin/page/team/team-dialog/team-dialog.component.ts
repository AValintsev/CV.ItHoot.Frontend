import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserDto} from "../../../../../models/user-dto";
import {UserService} from "../../../../../services/user.service";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {SmallResumeDto} from "../../../../../models/resume/small-resume-dto";
import {ResumeService} from "../../../../../services/resume.service";
import {TeamDto, TeamResumeDto} from "../../../../../models/team/create-team-dto";
import {ResumeTemplateDto} from "../../../../../models/resume/resume-template-dto";

@Component({
  selector: 'cv-team-dialog',
  templateUrl: './team-dialog.component.html',
  styleUrls: ['./team-dialog.component.scss']
})
export class TeamDialogComponent implements OnInit {

  team: TeamDto = {} as TeamDto;
  clients: UserDto[] = [];
  resumes: SmallResumeDto[] = [];
  resumeTemplates:ResumeTemplateDto[] = [];

  separatorKeysCodes: number[] = [ENTER, COMMA];
  resumeCtrl = new FormControl();
  filteredResumes: Observable<SmallResumeDto[]>;
  allResumes: SmallResumeDto[] = [];
  @ViewChild('resumeInput') resumeInput!: ElementRef<HTMLInputElement>;

  ngOnInit() {
  }


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<TeamDialogComponent>,
              userService: UserService,
              resumeService: ResumeService) {
    this.team = data;
    userService.getUsersByRole('client').subscribe(clients => this.clients = clients);
    resumeService.getAllResume().subscribe(resumes => this.allResumes = resumes);
    resumeService.getAllTemplates().subscribe(templates=>this.resumeTemplates = templates);
    this.filteredResumes = this.resumeCtrl.valueChanges.pipe(
      startWith(''),
      map((resume) => (resume ? this._filter(resume) : this.allResumes.slice())),
    );
  }

  add(event: MatChipInputEvent): void {
    event.chipInput!.clear();
    this.resumeCtrl.setValue(null);
  }

  remove(fruit: SmallResumeDto): void {
    const index = this.resumes.indexOf(fruit);

    if (index >= 0) {
      this.resumes.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.resumes.push(event.option.value);
    this.resumeInput.nativeElement.value = '';
    this.resumeCtrl.setValue(null);
  }

  private _filter(value: string): SmallResumeDto[] {
    const filterValue = "" + value;
    return this.allResumes.filter(fruit => fruit.resumeName?.toLowerCase().trim().includes(filterValue.toLowerCase().trim()));
  }

  canCreate(): boolean {
    return !this.team.teamName || !this.team.clientId;
  }

  click(){
    if(!this.team.resumes)
      this.team.resumes = []

    this.resumes.forEach(resume =>{
      this.team.resumes.push({resumeId:resume.id} as TeamResumeDto);
    })
    this.dialogRef.close(this.team);
  }
}
