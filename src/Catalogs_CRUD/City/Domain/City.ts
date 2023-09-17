import { CreatedAt } from "../../../Shared/Domain/CreatedAt";
import { CreatedBy } from "../../../Shared/Domain/CreatedBy";
import { Enabled } from "../../../Shared/Domain/Enabled";
import { Id } from "../../../Shared/Domain/Id";
import { ModifiedAt } from "../../../Shared/Domain/ModifiedAt";
import { ModifiedBy } from "../../../Shared/Domain/ModifiedBy";
import { CityName } from "./CityName";
import { ICity } from "./ICity";

export class City {
  private readonly id: Id;
  private cityName: CityName;
  private id_province: Id;
  private readonly created_by: CreatedBy;
  private readonly created_at: CreatedAt;
  private modified_by: ModifiedBy;
  private modified_at: ModifiedAt;
  private enabled: Enabled;

  constructor(data: ICity) {
    this.id = new Id(data.id);
    this.cityName = new CityName(data.city);
    this.id_province = new Id(data.id_province);
    this.created_by = new CreatedBy(data.created_by);
    this.created_at = new CreatedAt(data.created_at);
    this.modified_by = new ModifiedBy(data.modifed_by);
    this.modified_at = new ModifiedAt(data.modified_at);
    this.enabled = new Enabled(data.enabled);
  }

  public UpdateCityName(cityName: string) {
    this.cityName = new CityName(cityName);
  }

  public UpdateProvinceId(provinceId: string) {
    this.id_province = new Id(provinceId);
  }

  public UpdateModifiedBy(username: string) {
    this.modified_by = new ModifiedBy(username);
  }

  public UpdateModifiedAt(date: Date) {
    this.modified_at = new ModifiedAt(date);
  }

  public DisabledCity() {
    this.enabled = new Enabled(false);
  }

  public ToPrimitives(): ICity {
    return {
      id: this.id.id,
      city: this.cityName.cityName,
      id_province: this.id_province.id,
      created_by: this.created_by.userName,
      created_at: this.created_at.currentDate,
      modifed_by: this.modified_by.userName,
      modified_at: this.modified_at.currentDate,
      enabled: this.enabled.enabled,
    };
  }
}
