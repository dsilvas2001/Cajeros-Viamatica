import { UserStatusValidator } from "../../infrastructure";

export class UserStatusDto {
  private constructor(public statusid?: string, public description?: string) {}

  /**
   *
   * @param object
   * @returns
   */
  static create(object: { [key: string]: any }): [string?, UserStatusDto?] {
    const { statusid, description } = object;

    if (!statusid) return ["Missing statusid"];
    if (!UserStatusValidator.statusId.test(statusid.length))
      return ["statusid 3 characters"];
    if (!description) return ["Missing description"];

    return [undefined, new UserStatusDto(statusid, description)];
  }
}
