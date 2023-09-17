import { InvalidArgumentError } from "../../../Shared/Domain/InvalidArgumentError";

export class CityName {
  constructor(readonly cityName: string) {
    this.cityName = cityName;
    this.ValidateCityName(cityName);
  }

  private ValidateCityName(cityName: string) {
    if (cityName.length > 50)
      throw new InvalidArgumentError(
        "El nombre de la cuidad no debe de exceder los 50 caracteres por favor intente de nuevo"
      );
  }
}
