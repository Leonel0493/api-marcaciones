import { InvalidArgumentError } from "../../../Shared/Domain/InvalidArgumentError";
import { Document } from "../Domain/Document";
import { DocumentRepository } from "../Domain/DocumentRepository";
import { Search } from "./Search";

export class Delete {
  constructor(private readonly repository: DocumentRepository) {}

  async Delete(id: string): Promise<boolean> {
    const search = new Search(this.repository);

    const foundDocument = await search.SearchById(id);

    if (foundDocument !== null) {
      const currentDocument = new Document(foundDocument);
      currentDocument.DisabledDocument();

      return this.repository.delete(currentDocument);
    }

    throw new InvalidArgumentError(
      "Lo sentimos el documento que intentas eliminar no esta disponible"
    );
  }
}
