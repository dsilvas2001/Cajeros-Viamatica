import { Repository } from "typeorm";
import { AppDataSource, User, UserStatus } from "../../data";
import {
  UserStatusDatasource,
  UserStatusDto,
  UserStatusModel,
} from "../../domain";
import { CustomError } from "../errors/custom.error";

export class UserStatusDatasourceImpl implements UserStatusDatasource {
  private userStatusRepository: Repository<UserStatus>;

  constructor() {
    this.userStatusRepository = AppDataSource.getRepository(UserStatus);
  }

  async register(addUserStatusDto: UserStatusDto): Promise<UserStatusModel> {
    try {
      const { statusid, description } = addUserStatusDto;

      const statusCreated = this.userStatusRepository.create({
        statusid: statusid,
        description: description,
      });
      await this.userStatusRepository.save(statusCreated);
      return statusCreated;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async findAll(): Promise<UserStatusModel[]> {
    try {
      return await this.userStatusRepository.find();
    } catch (err) {
      if (err instanceof Error) {
        throw CustomError.serverUnavailable(err.message);
      } else {
        throw CustomError.serverUnavailable("An unknown error occurred");
      }
    }
  }
}
