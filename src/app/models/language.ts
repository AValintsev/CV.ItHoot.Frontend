interface ILanguage{
  id: number;
  name: string;
  level: string;
  cvId: number;
}


export class Language {
    id!: number;
    name!: string;
    level!: string;
    cvId!: number;


  public constructor() {
        this.id = 0;
        this.name = '';
        this.level = '';
    };
  // // @ts-ignore
  //   constructor(name:string,level:s) {
  //     this.id=0
  //     this.name = name;
  //     this.level = level;
  //   }

}
