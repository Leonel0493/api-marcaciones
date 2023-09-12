import { InvalidArgumentError } from "../../../Shared/Domain/InvalidArgumentError";

export class CountryAbbreviation {
  constructor(readonly abbreviation: string) {
    this.abbreviation = abbreviation;
    this.validateLenght(this.abbreviation);
  }

  private validateLenght(abbreviation: string) {
    if (abbreviation.length > 3)
      throw new InvalidArgumentError(
        "La abreviacion del pais excede el numero de caracteres permitidos"
      );
  }
}
