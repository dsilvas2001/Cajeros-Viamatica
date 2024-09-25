import { Request, Response } from "express";
import { RolDto, RolRepository } from "../../domain";
import { CustomError } from "../../infrastructure";

export class RolController {
  constructor(private readonly rolRepository: RolRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statuscode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  addRol = async (req: Request, res: Response) => {
    try {
      const [error, rolDto] = RolDto.create(req.body);

      if (error) {
        return res.status(400).json({ error });
      }

      const client = await this.rolRepository.register(rolDto!);

      res.status(201).json(client);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getAllRol = async (req: Request, res: Response) => {
    try {
      const rols = await this.rolRepository.findAll();

      res.status(200).json(rols);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
