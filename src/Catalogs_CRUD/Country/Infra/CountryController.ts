import { Request, Response } from "express";
import { Delete } from "../Application/Delete";
import { Save } from "../Application/Save";
import { Search } from "../Application/Search";
import { Update } from "../Application/Update";
import { IUpdateCountryData } from "../Domain/ICountry";
import { InvalidArgumentError } from "../../../Shared/Domain/InvalidArgumentError";
import { Id } from "../../../Shared/Domain/Id";

interface saveRequestData {
  country: string;
  abbreviation: string;
  flagImage: Buffer | null;
  createdBy: string;
}

interface updateRequestData {
  id: string;
  country: string;
  abbreviation: string;
  flagImage: Buffer | null;
  modifiedBy: string;
}

export class CountryController {
  constructor(
    private Save: Save,
    private Update: Update,
    private Delete: Delete,
    private Search: Search
  ) {}

  public search = async (req: Request<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params;
      const _Id = new Id(id);

      const data = await this.Search.Search(_Id);

      return res.status(200).json(data);
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json({ message: "Internal Server error" });
    }
  };

  public allCountries = async (_req: Request, res: Response) => {
    try {
      const data = await this.Search.GetAll();

      return res.status(200).json(data);
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json({ message: "Internal Server error" });
    }
  };

  public save = async (
    req: Request<{}, {}, saveRequestData>,
    res: Response
  ) => {
    try {
      const { country, abbreviation, flagImage, createdBy } = req.body;

      const countrySaved = await this.Save.Save(
        country,
        abbreviation,
        flagImage,
        createdBy
      );

      return res.status(201).json(countrySaved);
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json(error);
    }
  };

  public update = async (
    req: Request<{}, {}, updateRequestData>,
    res: Response
  ) => {
    try {
      const { id, country, abbreviation, flagImage, modifiedBy } = req.body;

      const _id = new Id(id);
      const _data: IUpdateCountryData = {
        abbreviation,
        country,
        flag_img: flagImage,
        modified_by: modifiedBy,
      };

      const newCountry = await this.Update.Update(_id, _data);

      return res.status(200).json({ newCountry });
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json({ message: "Internal Server error" });
    }
  };

  public delete = async (
    req: Request<{}, {}, { id: string }>,
    res: Response
  ) => {
    try {
      const { id } = req.body;

      const isDisabled = await this.Delete.Delete(id);

      return isDisabled
        ? res.status(200).json({ message: "El pais fue eliminado" })
        : res.status(400).json({
            message:
              "Lo sentimos no se pudo eliminar el pais intente mas tarde.",
          });
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json({ message: "Internal Server error" });
    }
  };
}
