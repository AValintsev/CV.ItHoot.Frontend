import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, startWith, switchMap,} from 'rxjs/operators';
import {ResumeSkillDto} from 'src/app/models/resume/resume-skill-dto';
import {DialogType} from 'src/app/models/enums';
import {SkillDto} from 'src/app/models/skill/skill-dto';
import {SkillService} from 'src/app/services/skill.service';

@Component({
  selector: 'cv-skill-dialog',
  templateUrl: './skill-dialog.component.html',
  styleUrls: ['./skill-dialog.component.scss'],
})
export class SkillDialog implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  skill: ResumeSkillDto = {} as ResumeSkillDto;
  typeDialog: DialogType;
  DialogType = DialogType;
  myControl = new FormControl();
  filteredOptions: Observable<SkillDto[]>;

  @ViewChild('input') input:any;

  ngOnInit() {
      setTimeout(()=>{ // this will make the execution after the above boolean has changed
        this.input.nativeElement.focus();
      },300);
  }

  constructor(
    private skillService: SkillService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.skill = data.data;
    this.typeDialog = data.type;
    this.myControl.setValue(this.skill.skillName);

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((val) => {
        return this.filter(val || '');
      })
    );
  }
  filter(val: string): Observable<SkillDto[]> {
    return this.skillService.searchSkill(val).pipe(
      map((data) => {
        if (data.length === 0) {
          data = [{ id: 0, name: val }];
        }
        return data;
      })
    );
  }



  skillSelected(option: any) {
    this.skill.skillName = option.name;
    this.skill.skillId = option.id;
  }

  canCreate(): boolean {
    return !(
      this.skill.skillName === '' ||
      this.skill.skillName === undefined ||
      this.skill.level === undefined
    );
  }
   ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
