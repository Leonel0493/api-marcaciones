import { InvalidArgumentError } from "../../../Shared/Domain/InvalidArgumentError";

export class CountryName {
  constructor(readonly country: string) {
    this.country = country;
    this.validateCountryName(this.country);
  }

  private validateCountryName(country: string) {
    if (country.length > 50)
      throw new InvalidArgumentError(
        "El nombre del pais excede el numero de caracters permitidos"
      );
  }
}
