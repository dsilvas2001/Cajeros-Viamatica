export class RolDto {
  private constructor(public rolid?: string, public rolName?: string) {}

  /**
   *
   * @param object
   * @returns
   */
  static create(object: { [key: string]: any }): [string?, RolDto?] {
    const { rolid, rolName } = object;

    if (!rolName) return ["Missing name"];

    return [undefined, new RolDto(rolid, rolName)];
  }
}
