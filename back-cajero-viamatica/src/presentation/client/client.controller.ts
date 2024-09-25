import { ClientDto, ClientRepository } from "../../domain";
import { CustomError } from "../../infrastructure";
import { Request, Response } from "express";

export class ClientController {
  constructor(private readonly clientRepository: ClientRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statuscode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  addClient = async (req: Request, res: Response) => {
    try {
      const [error, clientDto] = ClientDto.create(req.body);

      if (error) {
        return res.status(400).json({ error });
      }

      const client = await this.clientRepository.register(clientDto!);

      res.status(201).json(client);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getAllClients = async (req: Request, res: Response) => {
    try {
      const clients = await this.clientRepository.findAll();

      res.status(200).json(clients);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  updateClient = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const [error, clientUpdateDto] = ClientDto.create(req.body);

      if (error) {
        return res.status(400).json({ error });
      }

      const updatedClient = await this.clientRepository.update(
        id,
        clientUpdateDto!
      );
      res.status(200).json(updatedClient);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  deleteClient = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      console.log(id);

      await this.clientRepository.delete(id);

      res.status(200).json({ message: "Client successfully deleted" });
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
