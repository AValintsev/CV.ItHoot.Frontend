import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { EducationDto } from '../../../../models/resume/education-dto';
import { DialogType } from '../../../../models/enums';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as moment from 'moment';
import { UserValidators } from '../../validators/check-date.validators';
import { Subject } from 'rxjs';
import { quillModulesConstant } from '../../constants/quill-editor-constants';
import { CustomStateMatcher } from '../../validators/custom-state-matcher';

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
  ],
})
export class EducationDialog implements OnInit, OnDestroy {
  quillModules = quillModulesConstant;

  private destroy$ = new Subject<boolean>();
  education: EducationDto = {} as EducationDto;
  typeDialog: DialogType;
  DialogType = DialogType;
  educationForm: UntypedFormGroup = {} as UntypedFormGroup;
  maxDate = new Date(Date.now());
  matcher!:CustomStateMatcher;
  ngOnInit() {
    this.validateForm();
    this.matcher = new CustomStateMatcher();
  }

  validateForm() {
    this.educationForm = new UntypedFormGroup({
      id: new UntypedFormControl(this.education.id),
      institutionName: new UntypedFormControl(this.education.institutionName, [
        Validators.required,
      ]),
      specialization: new UntypedFormControl(this.education.specialization, [
        Validators.required,
      ]),
      degree: new UntypedFormControl(this.education.degree, [
        Validators.required,
      ]),
      description: new UntypedFormControl(this.education.description, []),
      startDate: new UntypedFormControl(this.education.startDate, [
        Validators.required
      ]),
      endDate: new UntypedFormControl(
        this.checkDataTypeFormControl(this.typeDialog),
        [
          Validators.required
        ]
      ),
    },{
      validators:UserValidators.checkValidEndDateDialog('startDate','endDate')
    });
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.typeDialog = data.type;
    this.education = data.data;
  }

  date = new UntypedFormControl(moment());
  checkDataTypeFormControl(type: DialogType) {
    if (type === DialogType.Create) {
      return moment();
    }
    return this.education.endDate;
  }
  setMonthAndYear(
    normalizedMonthAndYear: any,
    datepicker: MatDatepicker<any>,
    point: string
  ) {
    let ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.educationForm.get(point)?.patchValue(ctrlValue.format());
    datepicker.close();
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
