import {
  AfterViewInit,
  Component,
  createNgModuleRef, ElementRef, Inject,
  Injector,
  Input,
  NgModule,
  NgModuleRef,
  OnInit,
  ViewChild, ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import {ResumeDto} from '../../../models/resume/resume-dto';
import {ResumeService} from '../../../services/resume.service';
import {CommonModule, DOCUMENT} from '@angular/common';
import {isObservable, Observable} from 'rxjs';
import {languages} from "monaco-editor";
import html = languages.html;
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatMenuModule} from "@angular/material/menu";

@Component({
  selector: 'resume-template-builder',
  templateUrl: './resume-template-builder.component.html',
  styleUrls: ['./resume-template-builder.component.scss'],
})
export class ResumeTemplateBuilderComponent implements OnInit {
  @ViewChild('resumeContainer', {read: ViewContainerRef})
  containerRef: ViewContainerRef;
  @Input() resume: ResumeDto;
  @Input() imports = [];
  @Input() resumeChanged: Observable<ResumeDto> | null;
  @Input() templatedChanged: Observable<number> | null | number;

  @Input() isCreate: boolean = false;
  templateHtml: string;
  loaded: boolean = false;

  constructor(
    private resumeService: ResumeService,
    private injector: Injector,
  ) {

  }

  private addComponent() {
    this.containerRef.clear();
    const html = this.templateHtml;
    const componentType = Component({
      template: html,
      selector: 'template-resume',
    })(class {
    });
    const moduleType = NgModule({
      imports: [CommonModule, MatTableModule,
        MatFormFieldModule,
        CommonModule,
        MatInputModule,
      ],
      declarations: [componentType],
    })(class {
    });

    const properties = {
      isPreviewMode:true,
      resume: this.resume,
      getYear: this.getYear,
      getMonth: this.getMonth,
      howOld: this.howOld,
    };

    const moduleRef: NgModuleRef<any> = createNgModuleRef(
      moduleType,
      this.injector
    );
    const component: any = this.containerRef.createComponent(componentType, {
      injector: this.injector,
      ngModuleRef: moduleRef,
    });
    Object.assign(component.instance, properties);

    this.resumeChanged?.subscribe((resume) => {
      component.instance.resume = resume;
    });

    this.loaded = true;
  }

  howOld(birthDay: string) {
    const today = new Date();
    const birthDate = new Date(birthDay);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  getYear(startDate: string, endDate: string) {
    let start = Date.parse(startDate);
    let end = Date.parse(endDate);
    if (end >= start) {
      let time = end - start;
      return Math.floor(time / (1000 * 60 * 60 * 24 * 30 * 12));
    }
    return 0;
  }

  getMonth(startDate: string, endDate: string) {
    let start = Date.parse(startDate);
    let end = Date.parse(endDate);
    if (end >= start) {
      let time = end - start;
      return Math.floor((time / (1000 * 60 * 60 * 24 * 30)) % 12);
    }
    return 0;
  }

  ngOnInit(): void {


    if (this.resume?.resumeTemplateId) {
      this.resumeService
        .getTemplateById(this.resume?.resumeTemplateId)
        .subscribe((data) => {
          this.templateHtml = data.html;
          this.addComponent();

        });
    }
    if (isObservable(this.templatedChanged)) {
      this.templatedChanged?.subscribe((templateId) => {
        this.resumeService.getTemplateById(templateId).subscribe((data) => {
          this.templateHtml = data.html;
          this.addComponent();
        });
      });
    } else if (typeof this.templatedChanged == 'number') {
      this.resumeService.getTemplateById(this.templatedChanged).subscribe((data) => {
        this.templateHtml = data.html;
        console.log(data.html)
        this.addComponent();
      });
    }


  }


}
