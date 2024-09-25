export class CashModel {
  constructor(
    public cashid: string,
    public cashdescription: string,
    public active?: boolean,
    public createdAt?: Date
  ) {}
}
