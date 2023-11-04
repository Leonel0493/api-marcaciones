import { InvalidArgumentError } from "../../../Shared/Domain/InvalidArgumentError";

export class Parttern {
  constructor(readonly parttern: string | null) {
    this.parttern = parttern;
    if (parttern !== null) this.ValidateParttern(parttern);
  }

  private ValidateParttern(parttern: string) {
    if (parttern.length > 150)
      throw new InvalidArgumentError(
        "La longitud del patron del documento no debe de exceder los 150 caracteres, por favor intente de nuevo."
      );
  }
}
