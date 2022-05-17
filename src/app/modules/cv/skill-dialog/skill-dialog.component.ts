import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {SkillService} from "../../../services/skill.service";
import {SkillDto, SkillTestDto} from "../../../models/resume-dto";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, map, startWith, switchMap} from "rxjs/operators";
import {DialogType} from "../../../models/dialog-type";

@Component({
  selector: 'app-skill-dialog',
  templateUrl: './skill-dialog.component.html',
  styleUrls: ['./skill-dialog.component.scss']
})
export class SkillDialog implements OnInit {

  skill: SkillDto = {} as SkillDto;
  typeDialog: DialogType;
  DialogType = DialogType;
  myControl = new FormControl();
  filteredOptions: Observable<SkillTestDto[]>;

  ngOnInit() {}


  constructor(
    private skillService: SkillService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.skill = data.data;
    this.typeDialog = data.type;
    this.myControl.setValue(this.skill.skillName)
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
        return this.filter(val || '')
      })
    )
  }
  filter(val: string): Observable<SkillTestDto[]> {
    return this.skillService.searchSkill(val).pipe(map(data=>{
      if(data.length === 0){
        data = [{id:0,name:val}]
      };
      return data;
    }));
  }


  skillSelected(option:any) {
    this.skill.skillName = option.name;
    this.skill.skillId = option.id;
  }

  canCreate(): boolean {
    if (this.skill.skillName === '' || this.skill.skillName === undefined || this.skill.level === undefined)
      return false;
    return true;
  }
}
