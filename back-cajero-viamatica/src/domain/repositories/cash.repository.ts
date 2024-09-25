import { CashDto } from "../dtos/cash.dto";
import { CashModel } from "../models/cash.model";

export abstract class CashRepository {
  abstract register(addCashDto: CashDto): Promise<CashModel>;

  abstract findAll(): Promise<CashModel[]>;

  abstract assignCashToUser(
    username: string,
    cashDescription: string
  ): Promise<void>;
}
