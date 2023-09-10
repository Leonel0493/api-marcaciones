import { validate } from "uuid";
import { InvalidArgumentError } from "./InvalidArgumentError";

export class Id {
  constructor(readonly id: string) {
    this.id = id;
    this.validateUuid(id);
  }

  private validateUuid(uuid: string) {
    if (!validate(uuid))
      throw new InvalidArgumentError(`${uuid} is not a valid uuid`);
  }
}
