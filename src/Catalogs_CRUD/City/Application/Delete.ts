import { InvalidArgumentError } from "../../../Shared/Domain/InvalidArgumentError";
import { City } from "../Domain/City";
import { CityRepository } from "../Domain/CityRepository";
import { Search } from "./Search";

export class Delete {
  constructor(private readonly repository: CityRepository) {}

  async Delete(id: string): Promise<boolean> {
    const search = new Search(this.repository);
    const foundCity = await search.SearchById(id);

    if (foundCity === null)
      throw new InvalidArgumentError(
        "Lo sentimos la ciudad que deseas eliminar no esta disponible"
      );

    const deleteCity = new City(foundCity);

    deleteCity.DisabledCity();

    return this.repository.delete(deleteCity);
  }
}
