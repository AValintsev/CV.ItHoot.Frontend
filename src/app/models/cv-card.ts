export class CvCard {
  public id: number;
  public cvName: string;
  public isDraft: boolean;
  public firstName: string;
  public lastName: string;
  public picture: string;

  public constructor() {
    this.id = 0;
    this.cvName = '';
    this.isDraft = true;
    this.firstName = '';
    this.lastName = '';
    this.picture = '';
  }
}
