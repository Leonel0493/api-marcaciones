import { InvalidArgumentError } from "../../../Shared/Domain/InvalidArgumentError";
import { City } from "../Domain/City";
import { CityRepository } from "../Domain/CityRepository";
import { ICity, IUpdateCity } from "../Domain/ICity";
import { Search } from "./Search";

export class Update {
  constructor(private readonly repository: CityRepository) {}

  async Update(id: string, data: IUpdateCity): Promise<ICity> {
    const search = new Search(this.repository);
    const foundCity = await search.SearchById(id);

    if (foundCity !== null) {
      const newCity = new City(foundCity);

      newCity.UpdateCityName(data.city);
      newCity.UpdateProvinceId(data.id_province);
      newCity.UpdateModifiedBy(data.modified_by);
      newCity.UpdateModifiedAt(new Date());

      return this.repository.update(newCity);
    }

    throw new InvalidArgumentError(
      "La ciudad que deseas actualizar no esta disponible"
    );
  }
}
