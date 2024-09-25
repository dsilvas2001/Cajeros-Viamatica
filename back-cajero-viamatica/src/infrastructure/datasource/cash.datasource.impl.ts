import { Repository } from "typeorm";
import { CashDatasource, CashDto, CashModel } from "../../domain";
import { CustomError } from "../errors/custom.error";
import { AppDataSource, Cash, User } from "../../data";

export class CashDatasourceImpl implements CashDatasource {
  private cashRepository: Repository<Cash>;
  private userRepository: Repository<User>;

  constructor() {
    this.cashRepository = AppDataSource.getRepository(Cash);
    this.userRepository = AppDataSource.getRepository(User);
  }

  async register(addCashDto: CashDto): Promise<CashModel> {
    try {
      const cashId = crypto.randomUUID();
      const { cashdescription, active } = addCashDto;

      const cashCreated = this.cashRepository.create({
        cashid: cashId,
        cashdescription: cashdescription,
        active,
      });
      await this.cashRepository.save(cashCreated);
      return cashCreated;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async findAll(): Promise<CashModel[]> {
    try {
      return await this.cashRepository.find();
    } catch (err) {
      if (err instanceof Error) {
        throw CustomError.serverUnavailable(err.message);
      } else {
        throw CustomError.serverUnavailable("An unknown error occurred");
      }
    }
  }

  async assignCashToUser(
    username: string,
    cashDescription: string
  ): Promise<void> {
    try {
      const user = await this.userRepository.findOne({
        where: { username },
        relations: ["rol", "cashes"],
      });

      if (!user) {
        throw CustomError.badRequest(`User "${username}" not found.`);
      }
      if (!user.userApproval) {
        throw CustomError.badRequest(`User "${username}" is not approved.`);
      }

      if (user.rol.rolName !== "Cajero") {
        throw CustomError.badRequest(
          `User "${username}" does not have the role "Cajero".`
        );
      }

      const cash = await this.cashRepository.findOne({
        where: { cashdescription: cashDescription },
      });

      if (!cash) {
        throw CustomError.badRequest(`Cash "${cashDescription}" not found.`);
      }

      if (user.cashes.length >= 2) {
        throw CustomError.badRequest(
          `Cash "${cashDescription}" already has the maximum number of users assigned.`
        );
      }

      const isCashAlreadyAssigned = user.cashes.some(
        (assignedCash) => assignedCash.cashid === cash.cashid
      );

      if (isCashAlreadyAssigned) {
        throw CustomError.badRequest(
          `Cash "${cashDescription}" is already assigned to user "${username}".`
        );
      }
      user.cashes = [...user.cashes, cash];

      await this.userRepository.save(user);
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
}
