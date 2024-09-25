import { TurnModel } from "../../domain";
import { CustomError } from "../errors/custom.error";

export class TurnMapper {
  static getTurnEntitiesFromObjects(
    objects: { [key: string]: any }[]
  ): TurnModel[] {
    return objects.map((object) => {
      const { turnid, description, cash, userGestorId, createdAt } = object;

      if (!turnid) {
        throw CustomError.badRequest("Turn entity requires an ID");
      }
      if (!userGestorId) {
        throw CustomError.badRequest("Turn entity requires a userGestorId");
      }
      if (!description) {
        throw CustomError.badRequest("Turn entity requires a description");
      }
      if (!cash) {
        // Puedes agregar más información al error o manejarlo
        throw CustomError.badRequest(
          `Turn entity requires a cash, but received ${JSON.stringify(cash)}`
        );
      }

      return new TurnModel(
        turnid.toString(),
        description,
        cash,
        userGestorId,
        createdAt
      );
    });
  }
}
