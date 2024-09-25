export class TurnDto {
  private constructor(
    public turnid?: string,
    public description?: string,
    public cashCashid?: string,
    public userGestorId?: string
  ) {}

  /**
   *
   * @param object
   * @returns
   */

  static create(object: { [key: string]: any }): [string?, TurnDto?] {
    const { turnid, description, cashCashid, userGestorId } = object;

    if (!description) return ["Missing description"];
    if (!cashCashid) return ["Missing cashCashid"];
    if (!userGestorId) return ["Missing userGestorId"];

    return [
      undefined,
      new TurnDto(turnid, description, cashCashid, userGestorId),
    ];
  }
}
