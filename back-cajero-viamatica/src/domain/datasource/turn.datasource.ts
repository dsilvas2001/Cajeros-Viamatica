import { TurnDto } from "../dtos/turn.dto";
import { TurnModel } from "../models/turn.model";

export abstract class TurnDatasource {
  abstract register(addTurnDto: TurnDto): Promise<TurnModel>;

  abstract findAll(): Promise<TurnModel[]>;

  abstract delete(turnId: string): Promise<void>;

  abstract update(turnId: string, turnUpdateDto: TurnDto): Promise<TurnModel>;
}
