import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EducationDto} from "../../../models/resume/education-dto";
import {DialogType} from "../../../models/enums";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import * as moment from 'moment';
import {UserValidators} from '../../shared/validators/user.validators';


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
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class EducationDialog implements OnInit,OnDestroy {

  education: EducationDto = {} as EducationDto;
  typeDialog: DialogType;
  DialogType = DialogType;
  educationForm: FormGroup = {} as FormGroup;
  maxDate = new Date(Date.now())
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
      endDate: new FormControl(this.checkDataTypeFormControl(this.typeDialog), [
        Validators.required, UserValidators.checkValidEndDateDialog(this)])
    });
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.typeDialog = data.type;
    this.education = data.data;
  }
  date = new FormControl(moment());
  checkDataTypeFormControl(type: DialogType) {
    if (type === DialogType.Create) {
      return moment();
    }
    return this.education.endDate;
  }
  setMonthAndYear(normalizedMonthAndYear: any, datepicker: MatDatepicker<any>, point: string) {
    let ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.educationForm.get(point)?.patchValue(ctrlValue.format());
    datepicker.close();
  }
  ngOnDestroy() { }
}
