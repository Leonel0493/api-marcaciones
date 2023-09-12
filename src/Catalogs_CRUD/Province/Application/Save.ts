import getUuid from "../../../Shared/Infra/uuidGenerator";
import { IProvince } from "../Domain/IProvince.";
import { Province } from "../Domain/Province";
import { ProvinceRepository } from "../Domain/ProvinceRepository";

export class Save {
  constructor(private readonly repository: ProvinceRepository) {}

  async Save(
    province: string,
    idCountry: string,
    createdBy: string
  ): Promise<IProvince> {
    const data: IProvince = {
      id: getUuid(),
      province,
      id_country: idCountry,
      created_by: createdBy,
      created_at: new Date(),
      modifed_by: null,
      modified_at: null,
      enabled: true,
    };

    const _province = new Province(data);

    return this.repository.save(_province);
  }
}
