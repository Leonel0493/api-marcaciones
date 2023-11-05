import _Documents from "../../../Shared/DB_Resources/Domain/_Documents";
import { Id } from "../../../Shared/Domain/Id";
import { InvalidArgumentError } from "../../../Shared/Domain/InvalidArgumentError";
import { Document } from "../Domain/Document";
import { DocumentRepository } from "../Domain/DocumentRepository";
import { IDocument } from "../Domain/IDocument";

export class SequelizeRepository implements DocumentRepository {
  async save(document: Document): Promise<IDocument> {
    const _document = document.GetPrimitives();

    const savedDocument = await _Documents.create({
      id: _document.id,
      document: _document.document,
      id_country: _document.id_country,
      parttern: _document.parttern,
      created_by: _document.created_by,
      created_at: _document.created_at,
      enabled: _document.enabled,
    });

    if (savedDocument === null)
      throw new InvalidArgumentError("Error al guardar el documento");

    return savedDocument;
  }

  async update(document: Document): Promise<IDocument> {
    const _document = document.GetPrimitives();

    const [updatedDocument] = await _Documents.update(
      {
        document: _document.document,
        id_country: _document.id_country,
        parttern: _document.parttern,
        modifed_by: _document.modifed_by,
        modified_at: _document.modified_at,
      },
      {
        where: { id: _document.id },
      }
    );

    if (updatedDocument === 0)
      throw new InvalidArgumentError(
        "Lo sentimos no se logro actualizar el documento solicitado"
      );

    return _document;
  }

  async delete(document: Document): Promise<boolean> {
    const _document = document.GetPrimitives();

    const [disabledDocument] = await _Documents.update(
      {
        enabled: _document.enabled,
      },
      {
        where: { id: _document.id },
      }
    );

    return disabledDocument === 0 ? false : true;
  }

  async getAll(): Promise<IDocument[]> {
    const allDocuments = await _Documents.findAll({
      where: { enabled: true },
      raw: true,
    });

    return allDocuments;
  }

  async searchById(id: Id): Promise<IDocument | null> {
    const foundDocument = await _Documents.findOne({
      where: { id: id.id, enabled: true },
      raw: true,
    });

    return foundDocument;
  }

  async searchByCountry(idCountry: Id): Promise<IDocument[] | null> {
    const documents = await _Documents.findAll({
      where: { id_country: idCountry.id, enabled: true },
      raw: true,
    });

    return documents;
  }
}
