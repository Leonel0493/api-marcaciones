import getUuid from "../../../Shared/Infra/uuidGenerator";
import { City } from "../Domain/City";
import { CityRepository } from "../Domain/CityRepository";
import { ICity } from "../Domain/ICity";

export class Save {
  constructor(private readonly repository: CityRepository) {}

  async Save(
    city: string,
    id_province: string,
    created_by: string
  ): Promise<ICity> {
    const _Icity: ICity = {
      id: getUuid(),
      city,
      id_province,
      created_by,
      created_at: new Date(),
      modifed_by: null,
      modified_at: null,
      enabled: true,
    };

    const _city = new City(_Icity);

    return this.repository.save(_city);
  }
}
