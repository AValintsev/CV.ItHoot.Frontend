import {Component, Inject, OnInit} from '@angular/core';
import {EducationDto} from "../../../models/resume-dto";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DialogType} from "../../../models/dialog-type";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'cv-education-dialog',
  templateUrl: './education-dialog.component.html',
  styleUrls: ['./education-dialog.component.scss']
})
export class EducationDialog implements OnInit {

  education: EducationDto = {} as EducationDto;
  typeDialog: DialogType;
  DialogType = DialogType;
  educationForm: FormGroup = {} as FormGroup;

  ngOnInit() {
    this.validateForm();
  }

  validateForm() {
    this.educationForm = new FormGroup({
      id: new FormControl(this.education.id),
      institutionName: new FormControl(this.education.institutionName, [
        Validators.required
      ]),
      specialization: new FormControl(this.education.specialization, [
        Validators.required
      ]),
      degree: new FormControl(this.education.degree, [
        Validators.required
      ]),
      description: new FormControl(this.education.description, [
        Validators.required
      ]),
      startDate: new FormControl(this.education.startDate, [
        Validators.required
      ]),
      endDate: new FormControl(this.education.endDate, [
        Validators.required])
    });
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.typeDialog = data.type;
    this.education = data.data;
  }

}
