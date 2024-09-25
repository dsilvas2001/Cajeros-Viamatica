export class TurnValidator {
  static get turnDescription() {
    return /^[A-Z]{2}\d{4}$/;
  }
}
