export class UserStatusModel {
  constructor(
    public statusid: string,
    public description: string,
    public createdAt?: Date
  ) {}
}
