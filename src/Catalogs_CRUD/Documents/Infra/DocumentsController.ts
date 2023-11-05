import { Request, Response } from "express";
import { Delete } from "../Application/Delete";
import { Save } from "../Application/Save";
import { Search } from "../Application/Search";
import { Update } from "../Application/Update";
import { InvalidArgumentError } from "../../../Shared/Domain/InvalidArgumentError";
import { IUpdateDocument } from "../Domain/IDocument";

interface ISaveDataRequest {
  document: string;
  id_country: string;
  parttern: string | null;
  user: string;
}

interface IUpdateDataRequest {
  id: string;
  document: string;
  id_country: string;
  parttern: string | null;
  user: string;
}

export class DocumentController {
  constructor(
    private Save: Save,
    private Update: Update,
    private Search: Search,
    private Delete: Delete
  ) {}

  public save = async (
    req: Request<{}, {}, ISaveDataRequest>,
    res: Response
  ) => {
    try {
      const { document, id_country, parttern, user } = req.body;
      const savedDocument = await this.Save.Save(
        document,
        parttern,
        id_country,
        user
      );

      return res.status(201).json(savedDocument);
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ messge: error });

      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  public update = async (
    req: Request<{}, {}, IUpdateDataRequest>,
    res: Response
  ) => {
    try {
      const { id, document, id_country, parttern, user } = req.body;
      const newData: IUpdateDocument = {
        document,
        id_country,
        parttern,
        modified_by: user,
      };

      const updatedDocument = await this.Update.Update(id, newData);

      return res.status(200).json(updatedDocument);
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ messge: error });

      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  public delete = async (req: Request<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params;

      const isDisabled = await this.Delete.Delete(id);

      return isDisabled
        ? res.status(200).json({ message: "El documento fue eliminado 😁." })
        : res.status(400).json({
            message:
              "Lo sentimos no hemos podido eliminar el documento, intente mas tarde 😔.",
          });
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json({ message: "Internal Server error" });
    }
  };

  public getAll = async (_req: Request, res: Response) => {
    try {
      const allDocuemnts = await this.Search.GetAll();

      return res.status(200).json(allDocuemnts);
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json(error);
    }
  };

  public searchById = async (req: Request<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params;
      const document = await this.Search.SearchById(id);

      return res.status(200).json(document);
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json({ message: "Internal Server error" });
    }
  };

  public searchByCountry = async (
    req: Request<{ id: string }>,
    res: Response
  ) => {
    try {
      const { id } = req.params;

      const documents = await this.Search.SearchByCountry(id);

      return res.status(200).json(documents);
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json({ message: "Internal Server error" });
    }
  };
}
