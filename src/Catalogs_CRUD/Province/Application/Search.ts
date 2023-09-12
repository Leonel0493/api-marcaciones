import { Id } from "../../../Shared/Domain/Id";
import { IProvince } from "../Domain/IProvince.";
import { ProvinceRepository } from "../Domain/ProvinceRepository";

export class Search {
  constructor(private readonly repository: ProvinceRepository) {}

  async GetAll(): Promise<IProvince[]> {
    return this.repository.getAll();
  }

  async SearchById(id: string): Promise<IProvince | null> {
    const _idProvince = new Id(id);
    return this.repository.searchByProvinceId(_idProvince);
  }

  async SearchByCountry(idCountry: string): Promise<IProvince[] | null> {
    const _idCountry = new Id(idCountry);
    return this.repository.searchByCountry(_idCountry);
  }
}
