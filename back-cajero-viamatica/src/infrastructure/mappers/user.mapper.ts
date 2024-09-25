import { UserModel } from "../../domain";
import { CustomError } from "../errors/custom.error";

export class UserMapper {
  static getUserEntitiesFromObjects(
    objects: { [key: string]: any }[]
  ): UserModel[] {
    return objects.map((object) => {
      const {
        userid,
        username,
        email,
        password,
        userApproval,
        dateApproval,
        createdBy,
        rol,
        userStatus,
        createdAt,
      } = object;

      if (!userid) {
        throw CustomError.badRequest("User entity requires an ID");
      }
      if (!username) {
        throw CustomError.badRequest("User entity requires a username");
      }
      if (!email) {
        throw CustomError.badRequest("User entity requires an email");
      }
      if (!password) {
        throw CustomError.badRequest("User entity requires a password");
      }

      // Asumiendo que rol y userStatus son objetos
      if (!rol || !rol.rolid || !rol.rolName) {
        throw CustomError.badRequest("User entity requires a valid role");
      }
      if (!userStatus || !userStatus.statusid) {
        throw CustomError.badRequest(
          "User entity requires a valid user status"
        );
      }

      return new UserModel(
        userid,
        username,
        email,
        password,
        userApproval,
        dateApproval,
        createdBy,
        rol,
        userStatus,
        createdAt
      );
    });
  }
}
