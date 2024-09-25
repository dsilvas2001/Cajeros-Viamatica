import {
  UserStatusDatasource,
  UserStatusDto,
  UserStatusModel,
  UserStatusRepository,
} from "../../domain";

export class UserStatusRepositoryImpl implements UserStatusRepository {
  constructor(private readonly userStatusDatasource: UserStatusDatasource) {}

  async register(addUserStatusDto: UserStatusDto): Promise<UserStatusModel> {
    return this.userStatusDatasource.register(addUserStatusDto);
  }

  async findAll(): Promise<UserStatusModel[]> {
    return this.userStatusDatasource.findAll();
  }
}
