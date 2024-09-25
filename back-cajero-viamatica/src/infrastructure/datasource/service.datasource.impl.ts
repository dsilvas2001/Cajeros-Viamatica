import { Repository } from "typeorm";
import { ServiceDatasource, ServiceDto, ServiceModel } from "../../domain";
import { AppDataSource, Service } from "../../data";
import { CustomError } from "../errors/custom.error";

export class ServiceDatasourceImpl implements ServiceDatasource {
  private serviceRepository: Repository<Service>;

  constructor() {
    this.serviceRepository = AppDataSource.getRepository(Service);
  }

  async register(addServiceDto: ServiceDto): Promise<ServiceModel> {
    try {
      const serviceId = crypto.randomUUID();
      const { servicename, servicedescription, price } = addServiceDto;

      const serviceCreated = this.serviceRepository.create({
        serviceid: serviceId,
        servicename: servicename,
        servicedescription: servicedescription,
        price: price,
      });
      await this.serviceRepository.save(serviceCreated);
      return serviceCreated;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async findAll(): Promise<ServiceModel[]> {
    try {
      return await this.serviceRepository.find();
    } catch (err) {
      if (err instanceof Error) {
        throw CustomError.serverUnavailable(err.message);
      } else {
        throw CustomError.serverUnavailable("An unknown error occurred");
      }
    }
  }
}
