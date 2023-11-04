import { Id } from "../../../Shared/Domain/Id";
import { DocumentRepository } from "../Domain/DocumentRepository";
import { IDocument } from "../Domain/IDocument";

export class Search {
  constructor(private readonly repository: DocumentRepository) {}

  async GetAll(): Promise<IDocument[]> {
    return this.repository.getAll();
  }

  async SearchById(id: string): Promise<IDocument | null> {
    const _idDocument = new Id(id);
    return this.repository.searchById(_idDocument);
  }

  async SearchByCountry(id: string): Promise<IDocument[] | null> {
    const _idCountry = new Id(id);
    return this.repository.searchByCountry(_idCountry);
  }
}
