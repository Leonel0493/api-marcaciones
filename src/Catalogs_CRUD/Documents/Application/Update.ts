import { InvalidArgumentError } from "../../../Shared/Domain/InvalidArgumentError";
import { Document } from "../Domain/Document";
import { DocumentRepository } from "../Domain/DocumentRepository";
import { IDocument, IUpdateDocument } from "../Domain/IDocument";
import { Search } from "./Search";

export class Update {
  constructor(private readonly repository: DocumentRepository) {}

  async Update(id: string, data: IUpdateDocument): Promise<IDocument> {
    const search = new Search(this.repository);
    const foundDocument = await search.SearchById(id);

    if (foundDocument !== null) {
      const currentDocument = new Document(foundDocument);

      currentDocument.UpdateDocumentName(data.document);
      currentDocument.UpdateIdCountry(data.id_country);
      currentDocument.UpdateParttern(data.parttern);
      currentDocument.UpdateModifiedBy(data.modified_by);
      currentDocument.UpdateModifiedAt(new Date());

      return this.repository.update(currentDocument);
    }

    throw new InvalidArgumentError(
      "El documento que deseas actualizar no esta disponible"
    );
  }
}
