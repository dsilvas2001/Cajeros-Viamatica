import { UserValidator } from "../../infrastructure";

export class UserDto {
  private constructor(
    public userid: string,
    public username: string,
    public email: string,
    public password: string,
    public rolName?: string,
    public userstatus_statusid?: string,
    public createdById?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UserDto?] {
    const {
      userid,
      username,
      email,
      password,
      rolName,
      userstatus_statusid,
      createdById,
    } = object;

    // Validaciones
    if (!username) return ["Missing username"];
    if (!UserValidator.username.test(username)) {
      return [
        "Username must be between 8 and 20 characters and contain only letters and numbers.",
      ];
    }
    if (!email) return ["Missing email"];
    if (!password) return ["Missing password"];
    if (!UserValidator.password.test(password)) {
      return [
        "Password must contain at least one uppercase letter, one number, and be between 8 and 30 characters.",
      ];
    }
    if (!rolName) return ["Missing role name"]; // Validación de rolName

    return [
      undefined,
      new UserDto(
        userid,
        username,
        email,
        password,
        rolName,
        userstatus_statusid,
        createdById
      ),
    ];
  }
}
