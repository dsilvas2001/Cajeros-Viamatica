import {
  TurnDatasource,
  TurnDto,
  TurnModel,
  TurnRepository,
} from "../../domain";

export class TurnRepositoryImpl implements TurnRepository {
  constructor(private readonly turnDatasource: TurnDatasource) {}

  async register(addTurnDto: TurnDto): Promise<TurnModel> {
    return this.turnDatasource.register(addTurnDto);
  }

  async findAll(): Promise<TurnModel[]> {
    return this.turnDatasource.findAll();
  }

  async delete(turnId: string): Promise<void> {
    return this.turnDatasource.delete(turnId);
  }

  async update(turnId: string, turnUpdateDto: TurnDto): Promise<TurnModel> {
    return this.turnDatasource.update(turnId, turnUpdateDto);
  }
}
