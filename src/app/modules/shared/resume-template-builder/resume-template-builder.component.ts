import {
  Component,
  createNgModuleRef,
  Injector,
  Input,
  NgModule,
  NgModuleRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {ResumeDto} from '../../../models/resume/resume-dto';
import {ResumeService} from '../../../services/resume.service';
import {CommonModule} from '@angular/common';
import {isObservable, Observable} from 'rxjs';
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

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
    const start = new Date(startDate);
    const end = new Date(endDate);
    const month = (end.getMonth()) - (start.getMonth());
    let year = end.getFullYear() - start.getFullYear()
    if(month<0){
     year = year-1;
    }
    return year;
  }

  getMonth(startDate: string, endDate: string) {

       const start:Date = new Date(startDate);
      const end:Date = new Date(endDate);
      const month = (end.getMonth()) - (start.getMonth());
    if (month<0) {
      return 12 + month;
    }else{
      return month
    }
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
        this.addComponent();
      });
    }


  }


}
