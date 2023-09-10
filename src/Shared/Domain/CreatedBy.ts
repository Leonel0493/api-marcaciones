import { InvalidArgumentError } from "./InvalidArgumentError";

export class CreatedBy {
  constructor(readonly userName: string) {
    this.userName = userName;
    this.isNullOrEmpty(userName);
    this.validateUserLength(userName);
  }

  private isNullOrEmpty(userName: string) {
    if (userName === null || userName === undefined || userName.trim() === "")
      throw new InvalidArgumentError(
        `El nombre de usuario no debe ser nulo o vacio`
      );
  }

  private validateUserLength(userName: string) {
    if (userName.length > 25)
      throw new InvalidArgumentError(
        `El nombre de usuario excede el valor permitido`
      );
  }
}
