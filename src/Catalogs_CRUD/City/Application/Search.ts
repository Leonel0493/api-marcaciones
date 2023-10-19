import { Id } from "../../../Shared/Domain/Id";
import { CityRepository } from "../Domain/CityRepository";
import { ICity } from "../Domain/ICity";

export class Search {
  constructor(private readonly repository: CityRepository) {}

  async GetAll(): Promise<ICity[]> {
    return this.repository.getAll();
  }

  async SearchById(id: string): Promise<ICity | null> {
    const _idCity = new Id(id);
    return this.repository.searchById(_idCity);
  }

  async SearchByProvince(idProvince: string): Promise<ICity[] | null> {
    const _idCity = new Id(idProvince);
    return this.repository.searchByProvince(_idCity);
  }
}
