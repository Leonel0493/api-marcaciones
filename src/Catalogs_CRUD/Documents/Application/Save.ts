import getUuid from "../../../Shared/Infra/uuidGenerator";
import { Document } from "../Domain/Document";
import { DocumentRepository } from "../Domain/DocumentRepository";
import { IDocument } from "../Domain/IDocument";

export class Save {
  constructor(private readonly repository: DocumentRepository) {}

  async Save(
    document: string,
    parttern: string | null,
    id_country: string,
    created_by: string
  ): Promise<IDocument> {
    const _IDocument: IDocument = {
      id: getUuid(),
      document,
      parttern,
      id_country,
      created_by,
      created_at: new Date(),
      modifed_by: null,
      modified_at: null,
      enabled: true,
    };

    const _document = new Document(_IDocument);

    return this.repository.save(_document);
  }
}
