export class ServiceDto {
  private constructor(
    public serviceid?: string,
    public servicename?: string,
    public servicedescription?: string,
    public price?: number
  ) {}

  /**
   *
   * @param object
   * @returns
   */
  static create(object: { [key: string]: any }): [string?, ServiceDto?] {
    const { serviceid, servicename, servicedescription, price } = object;

    if (!servicename) return ["Missing servicename"];
    if (!servicedescription) return ["Missing servicedescription"];
    if (!price) return ["Missing price"];

    return [
      undefined,
      new ServiceDto(serviceid, servicename, servicedescription, price),
    ];
  }
}
