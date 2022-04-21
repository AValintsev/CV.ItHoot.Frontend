export class CvCard {
  public id: number;
  public cvName: string;
  public isDraft: boolean;
  public userName: string;
  public lastName: string;
  public picture: string;

  public constructor() {
    this.id = 0;
    this.cvName = '';
    this.isDraft = true;
    this.userName = '';
    this.lastName = '';
    this.picture = '';
  }
}
