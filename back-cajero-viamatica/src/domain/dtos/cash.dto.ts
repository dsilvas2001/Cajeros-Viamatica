export class CashDto {
  private constructor(
    public cashid?: string,
    public cashdescription?: string,
    public active?: boolean | true
  ) {}

  /**
   *
   * @param object
   * @returns
   */
  static create(object: { [key: string]: any }): [string?, CashDto?] {
    const { cashid, cashdescription } = object;

    if (!cashdescription) return ["Missing cashdescription"];

    return [undefined, new CashDto(cashid, cashdescription)];
  }
}
