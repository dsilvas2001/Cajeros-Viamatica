import { TurnDto, TurnRepository } from "../../domain";
import { CustomError } from "../../infrastructure";
import { Request, Response } from "express";

export class TurnController {
  constructor(private readonly turnRepository: TurnRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statuscode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  addTurn = async (req: Request, res: Response) => {
    try {
      const [error, turnDto] = TurnDto.create(req.body);

      if (error) {
        return res.status(400).json({ error });
      }

      const client = await this.turnRepository.register(turnDto!);

      res.status(201).json(client);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getAllTurns = async (req: Request, res: Response) => {
    try {
      const clients = await this.turnRepository.findAll();

      res.status(200).json(clients);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  //   updateClient = async (req: Request, res: Response) => {
  //     try {
  //       const { id } = req.params;

  //       const [error, clientUpdateDto] = TurnDto.create(req.body);

  //       if (error) {
  //         return res.status(400).json({ error });
  //       }

  //       const updatedClient = await this.turnRepository.update(
  //         id,
  //         clientUpdateDto!
  //       );
  //       res.status(200).json(updatedClient);
  //     } catch (error) {
  //       this.handleError(error, res);
  //     }
  //   };

  deleteTurn = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      console.log(id);

      await this.turnRepository.delete(id);

      res.status(200).json({ message: "Client successfully deleted" });
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
