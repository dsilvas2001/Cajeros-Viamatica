import { UserStatusDto } from "../dtos/user-status.dto";
import { UserStatusModel } from "../models/user-status.model";

export abstract class UserStatusRepository {
  abstract register(addUserStatusDto: UserStatusDto): Promise<UserStatusModel>;

  abstract findAll(): Promise<UserStatusModel[]>;
}
