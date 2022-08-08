import {
  Component,
  ComponentRef,
  createNgModuleRef,
  Injector,
  Input,
  NgModule,
  NgModuleRef,
  OnInit, Renderer2,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ResumeDto} from "../../../models/resume/resume-dto";
import {isObservable, Observable} from "rxjs";
import {ResumeService} from "../../../services/resume.service";
import {CommonModule} from "@angular/common";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule, UntypedFormGroup} from "@angular/forms";
import {QuillModule} from "ngx-quill";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDialog} from '@angular/material/dialog';
import {ResumeBuilderService} from "../../../services/resume-builder/resume-builder.service";
import {ResumeParserService} from "../../../services/resume-builder/resume-parser.service";
import {MatIcon, MatIconModule} from "@angular/material/icon";

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike', 'code-block', {'header': 1}, {'header': 2}, {'list': 'ordered'}, {'list': 'bullet'}, {'align': []}],        // toggled buttons
    [{'size': ['small', false, 'large', 'huge']}, {'header': [1, 2, 3, 4, 5, 6, false]}],
  ]
};

@Component({
  selector: 'cv-resume-builder-editor',
  templateUrl: './resume-builder-editor.component.html',
  styleUrls: ['./resume-builder-editor.component.scss'],
})
export class ResumeBuilderEditorComponent implements OnInit {

  @Input() public resumeForm: UntypedFormGroup = {} as UntypedFormGroup;
  @ViewChild('resumeContainer', {read: ViewContainerRef})
  containerRef: ViewContainerRef;
  @Input() resume: ResumeDto;
  @Input() imports = [];
  @Input() resumeChanged: Observable<ResumeDto> | null;
  @Input() templatedChanged: Observable<number> | null | number;
  protected componentRef?: ComponentRef<any>;
  @Input() isCreate: boolean = false;
  templateHtml: string;
  loaded: boolean = false;
  resumeBuilderService: ResumeBuilderService;

  constructor(
    private resumeService: ResumeService,
    private injector: Injector,
    private dialog: MatDialog,
  ) {}


  private renderComponent() {

    this.componentRef?.destroy();

    const componentType = Component({
      template: this.templateHtml,
      selector: 'template-resume',
    })(class {
    });

    const moduleType = NgModule({
      imports: [
        CommonModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatIconModule,
        QuillModule.forRoot(),

      ],
      declarations: [componentType],
    })(class {});

    const properties = {
      isPreviewMode: false,
      resume: this.resume,
      resumeForm: this.resumeForm,
      getYear: this.resumeBuilderService.getYear,
      getMonth: this.resumeBuilderService.getMonth,
      howOld: this.resumeBuilderService.howOld,

      openExperienceDialog: this.resumeBuilderService.openExperienceDialog.bind(this.resumeBuilderService),
      removeExperience: this.resumeBuilderService.removeExperience.bind(this.resumeBuilderService),

      openSkillDialog: this.resumeBuilderService.openSkillDialog.bind(this.resumeBuilderService),
      removeSkill: this.resumeBuilderService.removeSkill.bind(this.resumeBuilderService),

      openEducationDialog: this.resumeBuilderService.openEducationDialog.bind(this.resumeBuilderService),
      removeEducation: this.resumeBuilderService.removeEducation.bind(this.resumeBuilderService),

      openLanguageDialog: this.resumeBuilderService.openLanguageDialog.bind(this.resumeBuilderService),
      removeLanguage: this.resumeBuilderService.removeLanguage.bind(this.resumeBuilderService),
      modules: modules,
    };


    const moduleRef: NgModuleRef<any> = createNgModuleRef(moduleType, this.injector);

    this.componentRef = this.containerRef.createComponent(componentType, {
      injector: this.injector,
      ngModuleRef: moduleRef
    });


    Object.assign(this.componentRef.instance, properties);

    this.resumeForm.valueChanges.subscribe((value) => {
      this.componentRef!.instance.resume = value;
    })

    this.loaded = true;
  }

  ngOnInit(): void {

    this.resumeBuilderService = new ResumeBuilderService(this.resume, this.resumeForm, this.dialog);

    if (this.resume?.resumeTemplateId) {
      this.resumeService.getTemplateById(this.resume?.resumeTemplateId).subscribe((data) => {
        data.html = this.buildHtml(data.html);
        this.templateHtml = data.html;
        this.renderComponent();
      });

    }
    if (isObservable(this.templatedChanged)) {

      this.templatedChanged?.subscribe(templateId => {
        this.resumeService.getTemplateById(templateId).subscribe(data => {
          data.html = this.buildHtml(data.html);
          this.templateHtml = data.html;
          this.renderComponent();
        });
      });

    } else if (typeof this.templatedChanged == 'number') {

      this.resumeService.getTemplateById(this.templatedChanged).subscribe((data) => {
        this.templateHtml = data.html;
        this.renderComponent();
      });

    }


  }

  buildHtml(html: string): string {
    const resumeParser = new ResumeParserService(this.resumeBuilderService);
    html = resumeParser.addElements(html);
    return html;
  }


}

