import { ClientModel } from "../../domain";
import { CustomError } from "../errors/custom.error";

export class ClientMapper {
  static getClientEntitiesFromObjects(
    objects: { [key: string]: any }[]
  ): ClientModel[] {
    return objects.map((object) => {
      const {
        clientid,
        name,
        lastname,
        identification,
        email,
        phonenumber,
        address,
        referenceaddress,
        createdAt,
      } = object;

      if (!clientid) {
        throw CustomError.badRequest("Client entity requires an ID");
      }
      if (!name) {
        throw CustomError.badRequest("Client entity requires a name");
      }
      if (!lastname) {
        throw CustomError.badRequest("Client entity requires a lastname");
      }
      if (!identification) {
        throw CustomError.badRequest(
          "Client entity requires an identification"
        );
      }
      if (!email) {
        throw CustomError.badRequest("Client entity requires email");
      }
      if (!phonenumber) {
        throw CustomError.badRequest("Client entity requires phonenumber");
      }
      if (!address) {
        throw CustomError.badRequest("Client entity requires address");
      }
      if (!referenceaddress) {
        throw CustomError.badRequest("Client entity requires referenceaddress");
      }

      return new ClientModel(
        clientid.toString(),
        name,
        lastname,
        identification,
        email,
        phonenumber,
        address,
        referenceaddress,
        createdAt
      );
    });
  }
}
