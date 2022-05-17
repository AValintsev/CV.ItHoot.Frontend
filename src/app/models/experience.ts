export class Experience {
    id!: number;
    company!: string;
    position!: string;
    description!: string;
    startDate?: Date;
    endDate?: Date;
    cvId!:number;

    public constructor() {
        this.id = 0;
        this.position = '';
        this.company = '';
        this.description = '';
    }
}