import { Request, Response } from "express";
import { UserDto, UserRepository } from "../../domain";
import { CustomError, JwtAdapter } from "../../infrastructure";

export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statuscode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  addUser = async (req: Request, res: Response) => {
    try {
      const { currentUserId, newUser } = req.body;

      const [error, registerUserDto] = UserDto.create(newUser);

      if (error) {
        return res.status(400).json({ error });
      }

      const user = await this.userRepository.register(
        currentUserId,
        registerUserDto!
      );

      res.status(201).json(user);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  validatorUser = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const { currentUserId } = req.body;
      const updatedValidator = await this.userRepository.validator(
        userId,
        currentUserId
      );
      res.status(200).json(updatedValidator);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userRepository.findAll();

      res.status(200).json(users);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const { currentUserId, editUser } = req.body;

      const [error, updateUserDto] = UserDto.create(editUser);

      if (error) {
        return res.status(400).json({ error });
      }

      const updatedUser = await this.userRepository.update(
        userId,
        updateUserDto!,
        currentUserId
      );

      res.status(200).json(updatedUser);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;

      const { currentUserId } = req.body;

      await this.userRepository.delete(currentUserId, userId);

      res.status(200).send({ message: `User successfully deleted ${userId}` });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  findByCredentials = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await this.userRepository.findByCredentials(email, password);

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = await JwtAdapter.generateToken({
        id: user.userid,
        email: user.email,
      });
      console.log("User Object:", user);

      res.status(200).json({
        email: user.email,
        password: user.password,
        token,
      });
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
