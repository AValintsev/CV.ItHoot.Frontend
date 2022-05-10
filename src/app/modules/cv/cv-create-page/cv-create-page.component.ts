import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ResumeService} from "../../../services/resume.service";
import {SnackBarService} from "../../../services/snack-bar.service";
import {Router} from "@angular/router";
import {ResumeDto} from "../../../models/resume-dto";

@Component({
  selector: 'app-cv-create-page',
  templateUrl: './cv-create-page.component.html',
  styleUrls: ['./cv-create-page.component.scss']
})
export class CvCreatePageComponent implements OnInit {

  resumeCreateDto:ResumeDto = {} as ResumeDto;
  public resumeCreateForm: FormGroup = {} as FormGroup;
  constructor(private resumeService: ResumeService,
              private snackbarService: SnackBarService,
              private router:Router) { }

  ngOnInit(): void {
    this.validateForm();
    this.resumeCreateDto.experiences = [];
    this.resumeCreateDto.skills = [];
    this.resumeCreateDto.educations = [];
    this.resumeCreateDto.userLanguages = [];
  }

  private validateForm(){
    this.resumeCreateForm = new FormGroup({
      cvName: new FormControl(this.resumeCreateDto.firstName,[
        Validators.required
      ]),
      firstName: new FormControl(this.resumeCreateDto.firstName,[
        Validators.required
      ]),
      lastName: new FormControl(this.resumeCreateDto.lastName,[
        Validators.required
      ]),
      email: new FormControl(this.resumeCreateDto.email,[
        Validators.required,
        Validators.email
      ]),
      site: new FormControl(this.resumeCreateDto.site),
      phone: new FormControl(this.resumeCreateDto.phone,[
        Validators.pattern('[- +()0-9]+')
      ]),
      code: new FormControl(this.resumeCreateDto.code),
      country: new FormControl(this.resumeCreateDto.country,[
        Validators.required
      ]),
      city: new FormControl(this.resumeCreateDto.city,[
        Validators.required
      ]),
      street: new FormControl(this.resumeCreateDto.street,[
        Validators.required
      ]),
      requiredPosition: new FormControl(this.resumeCreateDto.requiredPosition,[
        Validators.required
      ]),
      birthdate: new FormControl(this.resumeCreateDto.requiredPosition,[
        Validators.required
      ]),
      aboutMe: new FormControl(this.resumeCreateDto.requiredPosition,[
        Validators.required
      ]),
      educations: new FormArray([]),
      experiences: new FormArray([]),
      skills: new FormArray([]),
      userLanguages: new FormArray([]),
    });
  }

  public submit(resume: ResumeDto){
    // console.log(resume)
    this.resumeService.createResume(resume).subscribe({
      next:()=>{
        this.snackbarService.showSuccess('Created');
        this.router.navigate(['/home/cv'])
      },
      error:(error)=>{
        this.snackbarService.showDanger('Something went wrong!')
      }
    })
  }

}