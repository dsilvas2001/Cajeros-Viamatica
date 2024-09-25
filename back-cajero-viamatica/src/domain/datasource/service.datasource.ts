import { ServiceDto } from "../dtos/service.dto";
import { ServiceModel } from "../models/service.model";

export abstract class ServiceDatasource {
  abstract register(addCashDto: ServiceDto): Promise<ServiceModel>;

  abstract findAll(): Promise<ServiceModel[]>;
}
