import { CreatedAt } from "../../../Shared/Domain/CreatedAt";
import { CreatedBy } from "../../../Shared/Domain/CreatedBy";
import { Enabled } from "../../../Shared/Domain/Enabled";
import { Id } from "../../../Shared/Domain/Id";
import { ModifiedAt } from "../../../Shared/Domain/ModifiedAt";
import { ModifiedBy } from "../../../Shared/Domain/ModifiedBy";
import { IProvince } from "./IProvince.";
import { ProvinceName } from "./ProvinceName";

export class Province {
  private readonly id: Id;
  private provinceName: ProvinceName;
  private idCountry: Id;
  private readonly createdBy: CreatedBy;
  private readonly createdAt: CreatedAt;
  private modifedBy: ModifiedBy;
  private modifiedAt: ModifiedAt;
  private enabled: Enabled;

  constructor(data: IProvince) {
    this.id = new Id(data.id);
    this.provinceName = new ProvinceName(data.province);
    this.idCountry = new Id(data.id_country);
    this.createdBy = new CreatedBy(data.created_by);
    this.createdAt = new CreatedAt(data.created_at);
    this.modifedBy = new ModifiedBy(data.modifed_by);
    this.modifiedAt = new ModifiedAt(data.modified_at);
    this.enabled = new Enabled(data.enabled);
  }

  public UpdateProvinceName(provice: string) {
    this.provinceName = new ProvinceName(provice);
  }

  public UpdateIdCountry(idCountry: string) {
    this.idCountry = new Id(idCountry);
  }

  public UpdateModifiedBy(userName: string) {
    this.modifedBy = new ModifiedBy(userName);
  }

  public UpdateModifiedAt(date: Date) {
    this.modifiedAt = new ModifiedAt(date);
  }

  public DisableProvince() {
    this.enabled = new Enabled(false);
  }

  public getPrimitives(): IProvince {
    return {
      id: this.id.id,
      province: this.provinceName.provinceName,
      id_country: this.idCountry.id,
      created_by: this.createdBy.userName,
      created_at: this.createdAt.currentDate,
      modifed_by: this.modifedBy.userName,
      modified_at: this.modifiedAt.currentDate,
      enabled: this.enabled.enabled,
    };
  }
}
