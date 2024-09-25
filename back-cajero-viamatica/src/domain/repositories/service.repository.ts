import { ServiceDto } from "../dtos/service.dto";
import { ServiceModel } from "../models/service.model";

export abstract class ServiceRepository {
  abstract register(addServiceDto: ServiceDto): Promise<ServiceModel>;

  abstract findAll(): Promise<ServiceModel[]>;
}
