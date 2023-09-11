import { Id } from "../../../Shared/Domain/Id";
import { InvalidArgumentError } from "../../../Shared/Domain/InvalidArgumentError";
import { Country } from "../Domain/Country";
import { CountryRepository } from "../Domain/CountryRepository";
import { IUpdateCountryData } from "../Domain/ICountry";
import { Search } from "./Search";

export class Update {
  constructor(
    private readonly repository: CountryRepository,
    private readonly searchRepository: CountryRepository
  ) {}

  async Update(id: Id, data: IUpdateCountryData) {
    const search = new Search(this.searchRepository);
    const currentCountry = await search.Search(id);

    if (currentCountry !== null) {
      const newCountry = new Country(currentCountry);

      newCountry.UpdateCountryName(data.country);
      newCountry.UpdateAbbreviation(data.abbreviation);
      newCountry.UpdateFlagImage(data.flag_img);
      newCountry.UpdateModifiedBy(data.modified_by);
      newCountry.UpdateModifiedAt(new Date());

      return this.repository.update(newCountry);
    }

    throw new InvalidArgumentError(
      "Lo sentimos el pais que desea actualizar no existe, por favor ingrese uno nuevo"
    );
  }
}
