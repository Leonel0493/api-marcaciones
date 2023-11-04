import { CreatedAt } from "../../../Shared/Domain/CreatedAt";
import { CreatedBy } from "../../../Shared/Domain/CreatedBy";
import { Enabled } from "../../../Shared/Domain/Enabled";
import { Id } from "../../../Shared/Domain/Id";
import { ModifiedAt } from "../../../Shared/Domain/ModifiedAt";
import { ModifiedBy } from "../../../Shared/Domain/ModifiedBy";
import { DocumentName } from "./DocumentName";
import { IDocument } from "./IDocument";
import { Parttern } from "./Parttern";

export class Document {
  private readonly id: Id;
  private documentName: DocumentName;
  private id_country: Id;
  private parttern: Parttern;
  private readonly created_by: CreatedBy;
  private readonly created_at: CreatedAt;
  private modified_by: ModifiedBy;
  private modified_at: ModifiedAt;
  private enabled: Enabled;

  constructor(data: IDocument) {
    this.id = new Id(data.id);
    this.documentName = new DocumentName(data.document);
    this.id_country = new Id(data.id_country);
    this.parttern = new Parttern(data.parttern);
    this.created_by = new CreatedBy(data.created_by);
    this.created_at = new CreatedAt(data.created_at);
    this.modified_by = new ModifiedBy(data.modifed_by);
    this.modified_at = new ModifiedAt(data.modified_at);
    this.enabled = new Enabled(data.enabled);
  }

  public UpdateDocumentName(document: string) {
    this.documentName = new DocumentName(document);
  }

  public UpdateIdCountry(id_country: string) {
    this.id_country = new Id(id_country);
  }

  public UpdateParttern(parttern: string | null) {
    this.parttern = new Parttern(parttern);
  }

  public UpdateModifiedBy(username: string) {
    this.modified_by = new ModifiedBy(username);
  }

  public UpdateModifiedAt(date: Date) {
    this.modified_at = new ModifiedAt(date);
  }

  public DisabledDocument() {
    this.enabled = new Enabled(false);
  }

  public GetPrimitives(): IDocument {
    return {
      id: this.id.id,
      document: this.documentName.documentName,
      id_country: this.id_country.id,
      parttern: this.parttern.parttern,
      created_by: this.created_by.userName,
      created_at: this.created_at.currentDate,
      modifed_by: this.modified_by.userName,
      modified_at: this.modified_at.currentDate,
      enabled: this.enabled.enabled,
    };
  }
}
