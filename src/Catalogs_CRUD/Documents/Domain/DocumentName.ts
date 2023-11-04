import { InvalidArgumentError } from "../../../Shared/Domain/InvalidArgumentError";

export class DocumentName {
  constructor(readonly documentName: string) {
    this.documentName = documentName;
    this.ValidateDocumentName(documentName);
  }

  private ValidateDocumentName(document: string) {
    if (document.length > 45)
      throw new InvalidArgumentError(
        "El nombre del documento no debe de exceder los 50 caracteres, por favor intente de nuevo"
      );
  }
}
