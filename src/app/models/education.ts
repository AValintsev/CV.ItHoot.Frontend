export class Education {
    id: number;
    institutionName: string;
    specialization: string;
    degree: string;
    description: string;
    startDate?: Date;
    endDate?: Date;
    cvId!:number;

    public constructor() {
        this.id = 0;
        this.institutionName = '';
        this.specialization = '';
        this.degree = '';
        this.description = '';
    }
}
