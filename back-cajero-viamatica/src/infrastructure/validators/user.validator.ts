export class UserValidator {
  /**
   *
   */
  static get username() {
    return /^(?=.*\d)[A-Za-z0-9]{8,20}$/;
  }
  /**
   *
   */
  static get password() {
    return /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,30}$/;
  }
}
