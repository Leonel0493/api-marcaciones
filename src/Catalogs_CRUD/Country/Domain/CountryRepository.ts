import { Id } from "../../../Shared/Domain/Id";
import { Country } from "./Country";
import { ICointry } from "./ICountry";

export interface CountryRepository {
  getAll(): Promise<ICointry[]>;
  save(country: Country): Promise<ICointry>;
  search(id: Id): Promise<ICointry | null>;
  update(country: Country): Promise<ICointry>;
  delete(id: Id): Promise<boolean>;
}
