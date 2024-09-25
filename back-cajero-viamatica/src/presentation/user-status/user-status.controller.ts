import { Request, Response } from "express";
import { UserStatusDto, UserStatusRepository } from "../../domain";
import { CustomError } from "../../infrastructure";

export class UserStatusController {
  constructor(private readonly userStatusRepository: UserStatusRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statuscode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  addUserStatus = async (req: Request, res: Response) => {
    try {
      const [error, userStatusDto] = UserStatusDto.create(req.body);

      if (error) {
        return res.status(400).json({ error });
      }

      const client = await this.userStatusRepository.register(userStatusDto!);

      res.status(201).json(client);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getAllUserStatus = async (req: Request, res: Response) => {
    try {
      const rols = await this.userStatusRepository.findAll();

      res.status(200).json(rols);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
