import { InvalidArgumentError } from "../../../Shared/Domain/InvalidArgumentError";

export class CountryFlagImage {
  constructor(readonly flagImg: Buffer | null) {
    this.flagImg = flagImg;
    if (this.flagImg !== null) {
      this.validateIsImage(this.flagImg);
      this.validateSize(this.flagImg);
    }
  }
  private validateIsImage(value: Buffer) {
    // * Definimos los encabezados de formato de imagen que queremos validar
    const imageFormats = [
      Buffer.from([0xff, 0xd8, 0xff]), // JPEG
      Buffer.from([0x89, 0x50, 0x4e, 0x47]), // PNG
      // TODO: Agregar más formatos si es necesario
    ];

    // * Verificar si el encabezado del Buffer coincide con alguno de los formatos de imagen
    const isImage = imageFormats.some((format) => value.equals(format));

    if (!isImage) {
      throw new InvalidArgumentError(
        "El formato de la imagen no es valido, seleccionar JPG, JPEG o PNG"
      );
    }
  }

  private validateSize(value: Buffer) {
    const maxSize = 16777215; // * Tamaño máximo para BLOB (16 MB) en bytes

    if (value.length > maxSize) {
      throw new InvalidArgumentError(
        "El tamaño de la imagen excede el limiete permitido"
      );
    }
  }
}
