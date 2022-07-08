import {Subject} from 'rxjs';
import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ExperienceDto} from '../../../models/resume/experience-dto';
import {DialogType} from '../../../models/enums';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter,} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE,} from '@angular/material/core';
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
  selector: 'cv-experience-dialog',
  templateUrl: './experience-dialog.component.html',
  styleUrls: ['./experience-dialog.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ExperienceDialog implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  experience: ExperienceDto = {} as ExperienceDto;
  typeDialog: DialogType;
  DialogType = DialogType;
  experienceForm: UntypedFormGroup = {} as UntypedFormGroup;
  maxDate = new Date(Date.now());
  ngOnInit() {
    this.validateForm();
  }

  validateForm() {
    this.experienceForm = new UntypedFormGroup({
      id: new UntypedFormControl(this.experience.id),
      company: new UntypedFormControl(this.experience.company, [Validators.required]),
      position: new UntypedFormControl(this.experience.position, [
        Validators.required,
      ]),
      description: new UntypedFormControl(this.experience.description, [
        Validators.required,
      ]),
      startDate: new UntypedFormControl(this.experience.startDate, [
        Validators.required,
      ]),
      endDate: new UntypedFormControl(this.checkDataTypeFormControl(this.typeDialog), [
        Validators.required,
        UserValidators.checkValidEndDateExperience(this),
      ]),
    });
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.typeDialog = data.type;
    this.experience = data.data;
  }
  date = new UntypedFormControl(moment());
  checkDataTypeFormControl(type: DialogType) {
    if (type === DialogType.Create) {
      return moment();
    }
    return this.experience.endDate;
  }
  setMonthAndYear(
    normalizedMonthAndYear: any,
    datepicker: MatDatepicker<any>,
    point: string
  ) {
    let ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.experienceForm.get(point)?.patchValue(ctrlValue.format());
    datepicker.close();
  }
   ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
