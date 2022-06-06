import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EducationDto} from "../../../models/resume/education-dto";
import {DialogType} from "../../../models/enums";
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'cv-education-dialog',
  templateUrl: './education-dialog.component.html',
  styleUrls: ['./education-dialog.component.scss'],
  providers:[
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class EducationDialog implements OnInit {

  education: EducationDto = {} as EducationDto;
  typeDialog: DialogType;
  DialogType = DialogType;
  educationForm: FormGroup = {} as FormGroup;
  maxDate = new Date(Date.now())
  ngOnInit() {
    this.validateForm();
    this.educationForm.valueChanges.subscribe(
      e=>console.log(e)
    )
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
      endDate: new FormControl(44/11/45, [
        Validators.required])
    });
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.typeDialog = data.type;
    this.education = data.data;
  }

}
