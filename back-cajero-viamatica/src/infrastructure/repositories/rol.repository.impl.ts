import { RolDatasource, RolDto, RolModel, RolRepository } from "../../domain";

export class RolRepositoryImpl implements RolRepository {
  constructor(private readonly rolDatasource: RolDatasource) {}

  async register(addRolDto: RolDto): Promise<RolModel> {
    return this.rolDatasource.register(addRolDto);
  }

  async findAll(): Promise<RolModel[]> {
    return this.rolDatasource.findAll();
  }
}
