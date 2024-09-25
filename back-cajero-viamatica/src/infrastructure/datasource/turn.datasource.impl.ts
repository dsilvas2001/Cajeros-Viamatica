import { QueryFailedError, Repository } from "typeorm";
import { TurnDatasource, TurnDto, TurnModel } from "../../domain";
import { AppDataSource, Cash, Turn, User } from "../../data";
import { CustomError } from "../errors/custom.error";
import { TurnMapper } from "../mappers/turn.mapper";

export class TurnDatasourceImpl implements TurnDatasource {
  private turnRepository: Repository<Turn>;
  private userRepository: Repository<User>;
  private cashRepository: Repository<Cash>;

  constructor() {
    this.turnRepository = AppDataSource.getRepository(Turn);
    this.userRepository = AppDataSource.getRepository(User);
    this.cashRepository = AppDataSource.getRepository(Cash);
  }

  /**
   *
   * @param addTurnDto
   * @returns
   */

  async register(addTurnDto: TurnDto): Promise<TurnModel> {
    try {
      const turnId = crypto.randomUUID();
      const { description, userGestorId, cashCashid } = addTurnDto;

      const existingGestor = await this.userRepository.findOne({
        where: { userid: addTurnDto.userGestorId },
        relations: ["rol"],
      });
      if (!existingGestor) {
        throw CustomError.badRequest("Current user not found.");
      }
      if (existingGestor.rol.rolName !== "Gestor") {
        throw CustomError.badRequest("Only Gestor can assign  turn.");
      }
      const existingCash = await this.cashRepository.findOne({
        where: { cashid: addTurnDto.cashCashid },
      });
      if (!existingCash) {
        throw CustomError.badRequest("Current user not found.");
      }

      const turnCreated = this.turnRepository.create({
        turnid: turnId,
        description: description,
        cash: {
          cashid: cashCashid,
          cashdescription: existingCash.cashdescription,
        },
        userGestorId: userGestorId,
      });
      await this.turnRepository.save(turnCreated);

      return turnCreated;
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
   * @param clientUpdateDto
   * @returns
   */

  async update(turnId: string, turnUpdateDto: TurnDto): Promise<TurnModel> {
    try {
      const turn = await this.turnRepository.findOneBy({ turnid: turnId });
      if (!turn) {
        throw CustomError.badRequest(`Turn with ID "${turnId}" not found.`);
      }

      const updatedTurn = { ...turn, ...turnUpdateDto };

      await this.turnRepository.update({ turnid: turnId }, updatedTurn);

      return updatedTurn;
    } catch (err) {
      if (err instanceof CustomError) {
        throw err;
      } else if (err instanceof Error) {
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

  async findAll(): Promise<TurnModel[]> {
    try {
      const turns = await this.turnRepository.find({
        relations: ["cash"], // Incluye la relación 'cash'
      });
      return TurnMapper.getTurnEntitiesFromObjects(turns);
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
   * @param turnId
   */

  async delete(turnId: string): Promise<void> {
    try {
      const turn = await this.turnRepository.findOneBy({
        turnid: turnId,
      });
      if (!turn) {
        throw CustomError.badRequest("Turn not exist");
      }

      await this.turnRepository.softDelete(turnId);
    } catch (err) {
      if (err instanceof Error) {
        throw CustomError.serverUnavailable(err.message);
      } else {
        throw CustomError.serverUnavailable("An unknown error occurred");
      }
    }
  }
}
