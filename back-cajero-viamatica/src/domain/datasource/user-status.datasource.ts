import { UserStatusDto } from "../dtos/user-status.dto";
import { UserStatusModel } from "../models/user-status.model";

export abstract class UserStatusDatasource {
  abstract register(addRolDto: UserStatusDto): Promise<UserStatusModel>;

  abstract findAll(): Promise<UserStatusModel[]>;
}
