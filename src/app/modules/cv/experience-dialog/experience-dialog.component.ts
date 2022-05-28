import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ExperienceDto} from "../../../models/resume/experience-dto";
import {DialogType} from "../../../models/enums";

@Component({
  selector: 'cv-experience-dialog',
  templateUrl: './experience-dialog.component.html',
  styleUrls: ['./experience-dialog.component.scss']
})
export class ExperienceDialog implements OnInit {

  experience: ExperienceDto = {} as ExperienceDto;
  typeDialog: DialogType;
  DialogType = DialogType;
  experienceForm: FormGroup = {} as FormGroup;

  ngOnInit() {
    this.validateForm();
  }

  validateForm() {
    this.experienceForm = new FormGroup({
      id: new FormControl(this.experience.id),
      company: new FormControl(this.experience.company, [
        Validators.required
      ]),
      position: new FormControl(this.experience.position, [
        Validators.required
      ]),
      description: new FormControl(this.experience.description, [
        Validators.required
      ]),
      startDate: new FormControl(this.experience.startDate, [
        Validators.required
      ]),
      endDate: new FormControl(this.experience.endDate, [
        Validators.required
      ])
    });
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.typeDialog = data.type;
    this.experience = data.data;
  }

}
