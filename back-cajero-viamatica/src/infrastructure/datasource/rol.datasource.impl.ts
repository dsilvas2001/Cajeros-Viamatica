import { Repository } from "typeorm";
import { AppDataSource, Rol } from "../../data";
import { RolDatasource, RolDto, RolModel } from "../../domain";
import { CustomError } from "../errors/custom.error";

export class RolDatasourceImpl implements RolDatasource {
  private rolRepository: Repository<Rol>;

  constructor() {
    this.rolRepository = AppDataSource.getRepository(Rol);
  }

  async register(addRolDto: RolDto): Promise<RolModel> {
    try {
      const rolId = crypto.randomUUID();
      const { rolName } = addRolDto;

      const rolCreated = this.rolRepository.create({
        rolid: rolId,
        rolName: rolName,
      });
      await this.rolRepository.save(rolCreated);
      return rolCreated;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async findAll(): Promise<RolModel[]> {
    try {
      return await this.rolRepository.find();
    } catch (err) {
      if (err instanceof Error) {
        throw CustomError.serverUnavailable(err.message);
      } else {
        throw CustomError.serverUnavailable("An unknown error occurred");
      }
    }
  }
}
