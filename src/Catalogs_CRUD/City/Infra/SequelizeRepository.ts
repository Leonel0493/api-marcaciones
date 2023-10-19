import _Cities from "../../../Shared/DB_Resources/Domain/_Cities";
import { Id } from "../../../Shared/Domain/Id";
import { InvalidArgumentError } from "../../../Shared/Domain/InvalidArgumentError";
import { City } from "../Domain/City";
import { CityRepository } from "../Domain/CityRepository";
import { ICity } from "../Domain/ICity";

export class SequelizeRepository implements CityRepository {
  async save(city: City): Promise<ICity> {
    const _city = city.GetPrimitives();

    const savedCity = await _Cities.create({
      id: _city.id,
      city: _city.city,
      id_province: _city.id_province,
      created_by: _city.created_by,
      created_at: _city.created_at,
      enabled: _city.enabled,
    });

    if (savedCity === null)
      throw new InvalidArgumentError("Error al guardar las ciudad");

    return savedCity;
  }

  async update(city: City): Promise<ICity> {
    const _city = city.GetPrimitives();

    const [newCity] = await _Cities.update(
      {
        city: _city.city,
        id_province: _city.id_province,
        modifed_by: _city.modifed_by,
        modified_at: _city.modified_at,
      },
      {
        where: { id: _city.id },
      }
    );

    if (newCity === 0)
      throw new InvalidArgumentError(
        "Lo sentimos no hemos podido actualizar los datos de la ciudad"
      );

    return _city;
  }

  async delete(city: City): Promise<boolean> {
    const _city = city.GetPrimitives();

    const [disabledCity] = await _Cities.update(
      {
        enabled: _city.enabled,
      },
      {
        where: { id: _city.id },
      }
    );

    return disabledCity === 0 ? false : true;
  }

  async getAll(): Promise<ICity[]> {
    const allCities = await _Cities.findAll({
      where: { enabled: true },
      raw: true,
    });

    return allCities;
  }

  async searchById(id: Id): Promise<ICity | null> {
    const foundCity = await _Cities.findOne({
      where: { id: id.id, enabled: true },
      raw: true,
    });

    return foundCity;
  }

  async searchByProvince(idProvince: Id): Promise<ICity[] | null> {
    const citiesByProvince = await _Cities.findAll({
      where: { id_province: idProvince.id, enabled: true },
      raw: true,
    });

    return citiesByProvince;
  }
}
