export class ServiceModel {
  constructor(
    public serviceid: string,
    public servicename: string,
    public servicedescription: string,
    public price: number,
    public createdAt?: Date
  ) {}
}
