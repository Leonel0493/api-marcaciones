import { InvalidArgumentError } from "../../../Shared/Domain/InvalidArgumentError";

export class ProvinceName {
  constructor(readonly provinceName: string) {
    this.provinceName = provinceName;
    this.ValidateProvinceName(this.provinceName);
  }

  private ValidateProvinceName(provice: string) {
    if (provice.length > 50)
      throw new InvalidArgumentError(
        "Lo sentimos el numero de caracteres es superior al permitido"
      );
  }
}
