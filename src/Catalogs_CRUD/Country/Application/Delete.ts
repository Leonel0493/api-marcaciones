import { Id } from "../../../Shared/Domain/Id";
import { InvalidArgumentError } from "../../../Shared/Domain/InvalidArgumentError";
import { CountryRepository } from "../Domain/CountryRepository";
import { Search } from "./Search";

export class Delete {
  constructor(private readonly repository: CountryRepository) {}

  async Delete(id: string): Promise<boolean> {
    const countryId = new Id(id);
    const search = new Search(this.repository);
    const countryExist = await search.Search(countryId);

    if (countryExist === null)
      throw new InvalidArgumentError(
        "Lo siento el pais que deseas eliminar no existe"
      );

    return this.repository.delete(countryId);
  }
}
