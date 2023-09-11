import { Id } from "../../../Shared/Domain/Id";
import { CountryRepository } from "../Domain/CountryRepository";
import { ICointry } from "../Domain/ICountry";

export class Search {
  constructor(private readonly repository: CountryRepository) {}

  async Search(id: Id): Promise<ICointry | null> {
    return this.repository.search(id);
  }

  async GetAll(): Promise<ICointry[]> {
    return this.repository.getAll();
  }
}
