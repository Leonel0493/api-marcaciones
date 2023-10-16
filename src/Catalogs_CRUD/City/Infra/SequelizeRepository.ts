import _Cities from "../../../Shared/DB_Resources/Domain/_Cities";
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

  // TODO: Agregar el resto de los casos del Repository
}
