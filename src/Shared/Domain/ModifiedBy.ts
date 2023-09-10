import { InvalidArgumentError } from "./InvalidArgumentError";

export class ModifiedBy {
  constructor(readonly userName: string | null) {
    this.userName = userName;
    if (userName !== null) this.validateUserLength(userName);
  }

  private validateUserLength(userName: string) {
    if (userName.length > 25)
      throw new InvalidArgumentError(
        `El nombre de usuario excede el valor permitido`
      );
  }
}
