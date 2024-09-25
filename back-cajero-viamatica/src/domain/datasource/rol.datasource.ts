import { RolDto } from "../dtos/rol.dto";
import { RolModel } from "../models/rol.model";

export abstract class RolDatasource {
  abstract register(addRolDto: RolDto): Promise<RolModel>;

  abstract findAll(): Promise<RolModel[]>;
}
