import getUuid from "../../../Shared/Infra/uuidGenerator";
import { Country } from "../Domain/Country";
import { CountryRepository } from "../Domain/CountryRepository";
import { ICointry } from "../Domain/ICountry";

export class Save {
  constructor(private readonly repository: CountryRepository) {}

  async Save(
    country: string,
    abbreviation: string,
    flagImage: Buffer | null,
    createdBy: string
  ): Promise<ICointry> {
    const _Icountry: ICointry = {
      id: getUuid(),
      country,
      abbreviation,
      flag_img: flagImage,
      created_by: createdBy,
      created_at: new Date(),
      modified_at: null,
      modified_by: null,
      enabled: true,
    };

    const _country = new Country(_Icountry);

    return this.repository.save(_country);
  }
}
