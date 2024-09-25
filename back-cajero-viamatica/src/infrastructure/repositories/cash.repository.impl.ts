import {
  CashDatasource,
  CashDto,
  CashModel,
  CashRepository,
} from "../../domain";

export class CashRepositoryImpl implements CashRepository {
  constructor(private readonly cashDatasource: CashDatasource) {}

  async register(addCashDto: CashDto): Promise<CashModel> {
    return this.cashDatasource.register(addCashDto);
  }

  async findAll(): Promise<CashModel[]> {
    return this.cashDatasource.findAll();
  }

  async assignCashToUser(
    username: string,
    cashDescription: string
  ): Promise<void> {
    return this.cashDatasource.assignCashToUser(username, cashDescription);
  }
}
