import { QueryFailedError, Repository } from "typeorm";
import { ClientDatasource, ClientDto, ClientModel } from "../../domain";
import { AppDataSource, Client } from "../../data";
import { ClientMapper } from "../mappers/client.mapper";
import { CustomError } from "../errors/custom.error";

export class ClientDatasourceImpl implements ClientDatasource {
  private clientRepository: Repository<Client>;

  constructor() {
    this.clientRepository = AppDataSource.getRepository(Client);
  }

  /**
   *
   * @param addClientDto
   * @returns
   */
  async register(addClientDto: ClientDto): Promise<ClientModel> {
    try {
      const clientId = crypto.randomUUID();
      const {
        name,
        lastname,
        identification,
        email,
        phonenumber,
        address,
        referenceaddress,
      } = addClientDto;

      const existingClient = await this.clientRepository.findOneBy({
        identification: identification,
      });

      if (existingClient) {
        throw CustomError.badRequest("Identification already exists");
      }

      const clientCreated = this.clientRepository.create({
        clientid: clientId,
        name: name,
        lastname: lastname,
        identification: identification,
        email: email,
        phonenumber: phonenumber,
        address: address,
        referenceaddress: referenceaddress,
      });
      await this.clientRepository.save(clientCreated);
      return clientCreated;
    } catch (err) {
      if (err instanceof QueryFailedError) {
        if (err.driverError.code === "23505") {
          throw CustomError.badRequest("A user with this email already exists");
        } else {
          throw CustomError.serverUnavailable(err.message);
        }
      } else if (err instanceof Error) {
        throw CustomError.serverUnavailable(err.message);
      } else {
        throw CustomError.serverUnavailable("An unknown error occurred");
      }
    }
  }

  /**
   *
   * @param clientId
   * @param clientUpdateDto
   * @returns
   */

  async update(
    clientId: string,
    clientUpdateDto: ClientDto
  ): Promise<ClientModel> {
    // Implementación para actualizar un cliente
    try {
      const client = await this.clientRepository.findOneBy({
        clientid: clientId,
      });
      if (!client) {
        throw CustomError.badRequest("Client not exist");
      }

      const updatedClient = { ...client, ...clientUpdateDto };

      await this.clientRepository.update({ clientid: clientId }, updatedClient);

      return updatedClient;
    } catch (err) {
      if (err instanceof Error) {
        throw CustomError.serverUnavailable(err.message);
      } else {
        throw CustomError.serverUnavailable("An unknown error occurred");
      }
    }
  }

  /**
   *
   * @returns
   */

  async findAll(): Promise<ClientModel[]> {
    try {
      const clients = await this.clientRepository.find();
      return ClientMapper.getClientEntitiesFromObjects(clients);
    } catch (err) {
      if (err instanceof Error) {
        throw CustomError.serverUnavailable(err.message);
      } else {
        throw CustomError.serverUnavailable("An unknown error occurred");
      }
    }
  }

  /**
   *
   * @param clientId
   */

  async delete(clientId: string): Promise<void> {
    try {
      const client = await this.clientRepository.findOneBy({
        clientid: clientId,
      });
      if (!client) {
        throw CustomError.badRequest("Client not exist");
      }

      await this.clientRepository.softDelete(clientId);
    } catch (err) {
      if (err instanceof Error) {
        throw CustomError.serverUnavailable(err.message);
      } else {
        throw CustomError.serverUnavailable("An unknown error occurred");
      }
    }
  }
}
