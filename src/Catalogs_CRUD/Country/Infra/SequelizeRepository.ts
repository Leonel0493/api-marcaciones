import _Country from "../../../Shared/DB_Resources/Domain/_Countries";
import { Id } from "../../../Shared/Domain/Id";
import { InvalidArgumentError } from "../../../Shared/Domain/InvalidArgumentError";
import { Country } from "../Domain/Country";
import { CountryRepository } from "../Domain/CountryRepository";
import { ICointry } from "../Domain/ICountry";

export class SequelizeRepository implements CountryRepository {
  async save(country: Country): Promise<ICointry> {
    const _country = country.getPrimitives();

    const savedCountry = await _Country.create({
      id: _country.id,
      country: _country.country,
      abbreviation: _country.abbreviation,
      flag_img: _country.flag_img,
      created_at: _country.created_at,
      created_by: _country.created_by,
      enabled: _country.enabled,
    });

    if (savedCountry === null)
      throw new InvalidArgumentError(
        "Error al guardar el pais, por favor intentelo mas tarde..."
      );

    return _country;
  }

  async update(country: Country): Promise<ICointry> {
    const _newCountry = country.getPrimitives();

    const [newCountryInfo] = await _Country.update(
      {
        country: _newCountry.country,
        abbreviation: _newCountry.abbreviation,
        flag_img: _newCountry.flag_img,
        created_by: _newCountry.created_by,
        created_at: _newCountry.created_at,
        modified_by: _newCountry.modified_by,
        modified_at: _newCountry.modified_at,
        enabled: _newCountry.enabled,
      },
      {
        where: { id: _newCountry.id },
      }
    );

    if (newCountryInfo === 0)
      throw new InvalidArgumentError(
        "Lo sentimos no pudimos actualizar los datos del pais"
      );

    return _newCountry;
  }

  async delete(id: Id): Promise<boolean> {
    const [_disabledCountry] = await _Country.update(
      {
        enabled: false,
      },
      {
        where: { id: id.id },
      }
    );

    return _disabledCountry === 0 ? false : true;
  }

  async search(id: Id): Promise<ICointry | null> {
    const _foundCountry = await _Country.findOne({
      where: { id: id.id, enabled: true },
      raw: true,
    });

    return _foundCountry;
  }

  async getAll(): Promise<ICointry[]> {
    const _allCountries = await _Country.findAll({
      where: { enabled: true },
      raw: true,
    });

    return _allCountries;
  }
}
