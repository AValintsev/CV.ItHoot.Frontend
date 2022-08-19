import {
  Component,
  createNgModuleRef,
  Injector,
  Input,
  NgModule,
  NgModuleRef,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ResumeDto } from "../../../models/resume/resume-dto";
import { Observable } from "rxjs";
import { ResumeService } from "../../../services/resume.service";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'template-builder',
  templateUrl: './template-builder.component.html',
  styleUrls: ['./template-builder.component.scss']
})
export class TemplateBuilderComponent implements OnInit {

  @ViewChild('resumeContainer', { static: true, read: ViewContainerRef }) containerRef: ViewContainerRef;
  @Input() resume: ResumeDto;
  @Input() templatedChanged: Observable<string> | null;
  @Input() templateHtml: string;
  isException: boolean = false;


  constructor(private resumeService: ResumeService,
    private injector: Injector) {


  }


  private addComponent() {
    try {
      this.containerRef.clear();
      const html = this.templateHtml;
      const componentType = Component({ template: html, selector: 'template-resumes' })(class {
      });
      const moduleType = NgModule({ imports: [CommonModule, MatIconModule], declarations: [componentType] })(class {
      });

      const properties = {
        isPreviewMode: true,
        resume: this.resume,
        getYear: this.getYear,
        getMonth: this.getMonth,
        howOld: this.howOld
      };

      const moduleRef: NgModuleRef<any> = createNgModuleRef(moduleType, this.injector);
      const component: any = this.containerRef.createComponent(componentType, {
        injector: this.injector,
        ngModuleRef: moduleRef
      });
      Object.assign(component.instance, properties);
    } catch (e) {
      this.containerRef.clear();
      this.isException = true;
    }


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
    if (month < 0) {
      year = year - 1;
    }
    // if (month <= 0 && year <= 0) {
    //   return ''
    // }
    return year;
  }

  getMonth(startDate: string, endDate: string) {

    const start: Date = new Date(startDate);
    const end: Date = new Date(endDate);
    const month = (end.getMonth()) - (start.getMonth());
    const year = end.getFullYear() - start.getFullYear()
    // if (month <= 0 && year <= 0) {
    //   return ''
    // }
    if (month < 0) {
      return 12 + month;
    } else {
      return month
    }
  }

  ngOnInit(): void {
    this.templatedChanged?.subscribe((html) => {
      this.templateHtml = html;
      this.addComponent();
    });
    this.isException = false;
    this.addComponent();

  }


}
