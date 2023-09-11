import { CreatedAt } from "../../../Shared/Domain/CreatedAt";
import { CreatedBy } from "../../../Shared/Domain/CreatedBy";
import { Enabled } from "../../../Shared/Domain/Enabled";
import { Id } from "../../../Shared/Domain/Id";
import { ModifiedAt } from "../../../Shared/Domain/ModifiedAt";
import { ModifiedBy } from "../../../Shared/Domain/ModifiedBy";
import { CountryAbbreviation } from "./CountryAbbreviation";
import { CountryFlagImage } from "./CountryFlagImage";
import { CountryName } from "./CountryName";
import { ICointry } from "./ICountry";

export class Country {
  private readonly id: Id;
  private countyName: CountryName;
  private countryAbbreviation: CountryAbbreviation;
  private flagImage: CountryFlagImage;
  private createdBy: CreatedBy;
  private createdAt: CreatedAt;
  private modifedBy: ModifiedBy;
  private modifiedAt: ModifiedAt;
  private enabled: Enabled;

  constructor(data: ICointry) {
    this.id = new Id(data.id);
    this.countyName = new CountryName(data.country);
    this.countryAbbreviation = new CountryAbbreviation(data.abbreviation);
    this.flagImage = new CountryFlagImage(data.flag_img);
    this.createdBy = new CreatedBy(data.created_by);
    this.createdAt = new CreatedAt(data.created_at);
    this.modifedBy = new ModifiedBy(data.modified_by);
    this.modifiedAt = new ModifiedAt(data.modified_at);
    this.enabled = new Enabled(data.enabled);
  }

  public UpdateCountryName(country: string) {
    this.countyName = new CountryName(country);
  }

  public UpdateAbbreviation(abbreviation: string) {
    this.countryAbbreviation = new CountryAbbreviation(abbreviation);
  }

  public UpdateFlagImage(flagImage: Buffer | null) {
    this.flagImage = new CountryFlagImage(flagImage);
  }

  public UpdateModifiedBy(userName: string) {
    this.modifedBy = new ModifiedBy(userName);
  }

  public UpdateModifiedAt(date: Date) {
    this.modifiedAt = new ModifiedAt(date);
  }

  public getPrimitives(): ICointry {
    return {
      id: this.id.id,
      country: this.countyName.country,
      abbreviation: this.countryAbbreviation.abbreviation,
      flag_img: this.flagImage.flagImg,
      created_by: this.createdBy.userName,
      created_at: this.createdAt.currentDate,
      modified_by: this.modifedBy.userName,
      modified_at: this.modifiedAt.currentDate,
      enabled: this.enabled.enabled,
    };
  }
}
