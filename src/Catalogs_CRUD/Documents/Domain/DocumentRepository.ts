import { Id } from "../../../Shared/Domain/Id";
import { Document } from "./Document";
import { IDocument } from "./IDocument";

export interface DocumentRepository {
  getAll(): Promise<IDocument[]>;
  searchById(id: Id): Promise<IDocument | null>;
  searchByCountry(idCountry: Id): Promise<IDocument[] | null>;
  save(document: Document): Promise<IDocument>;
  update(document: Document): Promise<IDocument>;
  delete(document: Document): Promise<boolean>;
}
