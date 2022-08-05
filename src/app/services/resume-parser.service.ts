import {Renderer2} from "@angular/core";
import {ResumeBuilderService} from "./resume-builder.service";

export class ResumeParserService {

  constructor(private resumeBuilder:ResumeBuilderService) {
  }

  addElements(html: string): string {

    html = `<form [formGroup]="resumeForm">` + html + `</form>`;

    const values = ['firstName', 'lastName', 'resumeName', 'email', 'site', 'phone', 'code', 'country', 'city', 'street', 'requiredPosition'];

    values.forEach((value) => {
      let input = this.buildMatInput(value);
      html = html.replace(`{{resume?.${value}}}`, input);
      html = html.replace(`{{resume.${value}}}`, input);
    });

    html = this.insertAboutMeEditor(html);
    html = this.buildDatePicker(html);
    // html = this.bindSkillDialog(html);
    // html = this.bindLanguageDialog(html);
    // html = this.buildExperienceEditor(html);
    // html = this.buildEducationEditor(html);
    return html;
  }

  buildEducationEditor(html: string): string {
    const element = '<div (click)="openEducationDialog(education)" class="clickable">{{education?.institutionName}}</div>';
    html = html.replace('{{education?.institutionName}}',element );
    html = html.replace('{{education.institutionName}}',element );
    return html;
  }

  buildExperienceEditor(html: string): string {
    // const parser = new DOMParser();
    // const doc = parser.parseFromString(html, "te![](../../../../../AppData/Local/Temp/logo.jpg)xt/html");
    //
    // console.log(doc.body.innerHTML);
    // const experienceItem = doc.getElementsByClassName('experience-item')[0];
    // experienceItem.addEventListener('click', (event) => {console.log(event)});
    // return doc.body.innerHTML;

    const element = '<div (click)="openExperienceDialog(experience)"  class="clickable">{{experience?.position}}</div>';
    html = html.replace('{{experience?.position}}', element);
    html = html.replace('{{experience.position}}', element);
    return html;
  }

  bindSkillDialog(html: string): string {

    html = html.replace('{{skill.skillName}}', '<div (click)="openSkillDialog(skill)"  class="clickable">{{skill.skillName}}</div>')
    return html;
  }

  bindLanguageDialog(html: string): string {
    html = html.replace('{{language.languageName}}', '<div (click)="openLanguageDialog(language)"  class="clickable">{{language.languageName}}</div>')
    return html;
  }

  buildMatInput(formControlName: string): string {

    const label = this.getLabelFromCamelCase(formControlName);

    const input =
      //  `<mat-form-field class="tester" appearance="fill">` +
      // `<mat-label>${label}</mat-label>` +
      `<input class="custom-input clickable" matInput formControlName="${formControlName}" placeholder="${label}" >`
    // +  '</mat-form-field>';

    return input;
  }

  insertAboutMeEditor(html: string): string {

    let editor = '<quill-editor [modules]="modules" formControlName="aboutMe" [styles]="{height: \'300px\'}" placeholder="Tell us about yourself. ' +
      'Please, mention years of experience, your key skills and qualifications, notable achievements & awards">' +
      '</quill-editor>';
    editor += this.buildMatError('aboutMe');

    html = html.replace(`[innerHTML]="resume?.aboutMe">`, `>${editor}`)
    return html;
  }

  buildMatError(formControlName: string): string {

    const label = this.getLabelFromCamelCase(formControlName);
    const matError = `<mat-error *ngIf="resumeForm.controls['${formControlName}'].errors?.['required'] && ( resumeForm.controls['${formControlName}'].dirty || resumeForm.controls['${formControlName}'].touched)">
     ${label} is required
      </mat-error>`
    return matError;
  }

  getLabelFromCamelCase(formControlName: string): string {
    return formControlName.replace(/([A-Z])/g, " $1");
  }

  buildDatePicker(html: string): string {
    const datePicker = ' <mat-form-field appearance="fill">' +
      '      <mat-label>Date of birth</mat-label>' +
      '      <input matInput [matDatepicker]="picker" formControlName="birthdate">' +
      '      <mat-hint>MM/DD/YYYY</mat-hint>' +
      '      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>' +
      '      <mat-datepicker #picker></mat-datepicker>' +
      '      <mat-error *ngIf="resumeForm.controls[\'birthdate\'].errors?.[\'required\']">' +
      '        Birthdate is required ' +
      '      </mat-error>' +
      '    </mat-form-field>'

    html = html.replace('{{howOld(resume?.birthdate!)}}', datePicker);
    html = html.replace('{{resume?.birthdate!}}', datePicker);
    return html;
  }

}
