import {
  ServiceDatasource,
  ServiceDto,
  ServiceModel,
  ServiceRepository,
} from "../../domain";

export class ServiceRepositoryImpl implements ServiceRepository {
  constructor(private readonly serviceDatasource: ServiceDatasource) {}

  async register(addServiceDto: ServiceDto): Promise<ServiceModel> {
    return this.serviceDatasource.register(addServiceDto);
  }

  async findAll(): Promise<ServiceModel[]> {
    return this.serviceDatasource.findAll();
  }
}
