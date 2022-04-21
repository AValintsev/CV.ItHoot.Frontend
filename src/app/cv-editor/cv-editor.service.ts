import { map, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IOrder, ILanguageLevel, ISkillLevel } from './../shared/models/cvEditorModels/EditorModels';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DraftCv, ICv , ISkill} from 'src/app/shared/models/cvEditorModels/EditorModels'
import { BaseApiService } from '../services/base-api.service';


@Injectable({
  providedIn: 'root',
})
export class CvEditorService extends BaseApiService {

  private cvBehavior = new BehaviorSubject<ICv>(null as any);
  cv$ = this.cvBehavior.asObservable();

  private allSkillLevelBehavior = new BehaviorSubject<ISkillLevel[]>(null as any);
  allSkillLevel$ = this.allSkillLevelBehavior.asObservable();

  private allLanguageLevelBehavior = new BehaviorSubject<ILanguageLevel[]>(null as any);
  allLanguageLevel$ = this.allLanguageLevelBehavior.asObservable();

  private filleBehavior = new BehaviorSubject<string>(null as any);
  filleData$ = this.filleBehavior.asObservable();

  languageLevels!: ILanguageLevel[];

  constructor(private _http: HttpClient,
    private router: Router) {
    super(_http)
  }

  public get getAllSkillLevels(): ISkillLevel[]{
    return this.allSkillLevelBehavior.value;
  }

  public get getAllLanguageLevels(): ILanguageLevel[]{
    return this.allLanguageLevelBehavior.value;
  }

  public get getCurrentCv(): ICv {
    return this.cvBehavior.value;
  }

  public uploadFile(filleData:string){
    this.filleBehavior.next(filleData);
  }


  // preparationForm(){
  //   this.
  // }

  getCvById(): Observable<ICv>{
    return this.get<ICv>("cv/?id=1")
    .pipe(
      map((data) =>
      {
        console.log(data);
        this.cvBehavior.next(data);
        return data;
      })
    )
  }

  getAllLanguageLevel() : Observable<ILanguageLevel[]> {
    return this.get<ILanguageLevel[]>("data/types/levelLanguages")
    .pipe(
      map((data)=> {
        data.sort((a,b) => a.id - b.id )
        this.languageLevels = data;
        this.allLanguageLevelBehavior.next(data);
        return data;
      })
    )
  }

  getAllSkillLevel() : Observable<ISkillLevel[]>{
    return this.get<ISkillLevel[]>("data/types/levelSkills")
    .pipe(
      map((data) => {
        data.sort((a,b) => a.id - b.id )
        this.allSkillLevelBehavior.next(data);
        return data;
      })
    )
  }


  createNew(){
    this.cvBehavior.next(new DraftCv);
  }

  skillDownInOrder(index: number) {
    this.downInElementInArr(this.cvBehavior.value.skills, index)
  }

  skillPutUpInOrder(index: number) {
    this.putUpElementInArr(this.cvBehavior.value.skills, index)
  }

  removeSkill(index: number) {

  }

  languageDownInOrder(index: number) {
    this.downInElementInArr(this.cvBehavior.value.userLanguages, index)
  }

  languagePutUpInOrder(index: number) {
    this.putUpElementInArr(this.cvBehavior.value.userLanguages, index)
  }

  educationDownInOrder(index: number) {
    this.downInElementInArr(this.cvBehavior.value.educations, index)
  }

  educationPutUpInOrder(index: number) {
    this.putUpElementInArr(this.cvBehavior.value.educations, index)
  }

  experienceDownInOrder(index: number) {
    this.downInElementInArr(this.cvBehavior.value.experiences, index)
  }

  experiencePutUpInOrder(index: number) {
    this.putUpElementInArr(this.cvBehavior.value.experiences, index)
  }

  private putUpElementInArr<T extends IOrder>( arr: Array<T>, index: number ): Array<T>{
    if(arr.length > 1 && index > 0){
      debugger;
      let tempOrderNumber = arr[index - 1].order;
      arr[index - 1].order = arr[index].order
      arr[index].order = tempOrderNumber;
    }
    return arr.sort((e, b)=> e.order - b.order)
  }

  private downInElementInArr<T extends IOrder>( arr: Array<T>, index: number ) : Array<T>{
    if(arr.length - 1 > index){
      let tempOrderNumber = arr[index + 1].order;
      arr[index + 1].order = arr[index].order
      arr[index].order = tempOrderNumber;
    }

    return arr.sort((a,b)=> {return a.order - b.order});
  }

  addNewLanguage(){
    this.cvBehavior.value.userLanguages.push({
      order: this.getNextOrderNumber(this.getCurrentCv.userLanguages),
      id: undefined,
      name: '',
      level: -1,
    })
  }

  addNewSkill() {
    this.cvBehavior.value.skills.push(
      {
        order: this.getNextOrderNumber(this.getCurrentCv.skills),
        id: undefined,
        name: '',
        level: -1,
      })
  }

  addNewEducation() {
    this.cvBehavior.value.educations.push(
      {
        order: this.getNextOrderNumber(this.getCurrentCv.educations),
        id: undefined,
        institutionName: '',
        specialization: '',
        degree: '',
        description: '',
        startDate: undefined,
        endDate: undefined,
      })
  }

  addNewExperience() {
    this.cvBehavior.value.experiences.push(
      {
        order: this.getNextOrderNumber(this.getCurrentCv.experiences),
        id: undefined,
        company: '',
        position: '',
        description: '',
        startDate: undefined,
        endDate: undefined,
      })
  }

  private getNextOrderNumber(arr: IOrder[]) : number {
    let maxOrderNumber = 0;
    arr.forEach(item => {
      if(item.order > maxOrderNumber){
        maxOrderNumber = item.order;
      }
    })
    return maxOrderNumber + 1;
  }
}
