import { InvalidArgumentError } from "./InvalidArgumentError";

export class ModifiedAt {
  constructor(readonly currentDate: Date | null) {
    this.currentDate = currentDate;
    if (currentDate !== null) this.validateDate(currentDate);
  }

  private validateDate(date: Date) {
    if (isNaN(date.getTime()))
      throw new InvalidArgumentError("La fecha proporcionada no es valida");

    const year = date.getFullYear();
    if (year < 1900 || year > 2100)
      throw new InvalidArgumentError("El año no es valido");

    const month = date.getMonth();
    if (month < 0 || month > 11)
      throw new InvalidArgumentError("El mes no es valido");

    const day = date.getDay();
    if (day < 1 || day > 31)
      throw new InvalidArgumentError("El dia del mes no es valido");
  }
}
