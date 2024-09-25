import { Request, Response } from "express";
import { CustomError } from "../../infrastructure";
import { CashDto, CashRepository } from "../../domain";

export class CashController {
  constructor(private readonly cashRepository: CashRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statuscode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  addCash = async (req: Request, res: Response) => {
    try {
      const [error, rolDto] = CashDto.create(req.body);

      if (error) {
        return res.status(400).json({ error });
      }

      const client = await this.cashRepository.register(rolDto!);

      res.status(201).json(client);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getAllCash = async (req: Request, res: Response) => {
    try {
      const rols = await this.cashRepository.findAll();

      res.status(200).json(rols);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  addCashToUser = async (req: Request, res: Response) => {
    try {
      const { username, cashdescription } = req.body;

      await this.cashRepository.assignCashToUser(username, cashdescription);

      return res.status(201).json({
        message: `Cash "${cashdescription}" assigned to user "${username}" successfully.`,
      });
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
