export class Skill {
    id!: number;
    name!: string;
    level!: number;
    cvId!:number;

    public constructor() {
        this.id = 0;
        this.name = '';
        this.level = 3;
        this.cvId=0;
    }
}
