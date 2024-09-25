import { Cash } from "../../data";

export class TurnModel {
  constructor(
    public turnid: string,
    public description: string,
    public cash: Cash,
    public userGestorId: string,
    public createdAt?: Date
  ) {}
}
