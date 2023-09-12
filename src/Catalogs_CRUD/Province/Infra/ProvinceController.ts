import { Request, Response } from "express";
import { Delete } from "../Application/Delete";
import { Save } from "../Application/Save";
import { Search } from "../Application/Search";
import { Update } from "../Application/Update";
import { InvalidArgumentError } from "../../../Shared/Domain/InvalidArgumentError";
import { IUpdateProvince } from "../Domain/IProvince.";

interface saveDataRequest {
  province: string;
  id_country: string;
  created_by: string;
}

interface updateProvince {
  id: string;
  province: string;
  id_country: string;
  modified_by: string;
}

export class ProvinceController {
  constructor(
    private Save: Save,
    private Update: Update,
    private Delete: Delete,
    private Search: Search
  ) {}

  public save = async (
    req: Request<{}, {}, saveDataRequest>,
    res: Response
  ) => {
    try {
      const { province, id_country, created_by } = req.body;
      const provinceSaved = await this.Save.Save(
        province,
        id_country,
        created_by
      );

      return res.status(201).json(provinceSaved);
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json({ message: "Internal Server error" });
    }
  };

  public update = async (
    req: Request<{}, {}, updateProvince>,
    res: Response
  ) => {
    try {
      const { id, province, id_country, modified_by } = req.body;
      const newData: IUpdateProvince = {
        province,
        id_country,
        modified_by,
      };
      const updatedProvince = await this.Update.Update(id, newData);

      return res.status(200).json(updatedProvince);
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json({ message: "Internal Server error" });
    }
  };

  public deleted = async (req: Request<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params;

      const isDisabled = await this.Delete.Delete(id);

      return isDisabled
        ? res.status(200).json({ message: "La provincia fue eliminada" })
        : res.status(400).json({
            message:
              "Lo sentimos no se pudo eliminar la provincia intente mas tarde.",
          });
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json({ message: "Internal Server error" });
    }
  };

  public getAll = async (_req: Request, res: Response) => {
    try {
      const all = await this.Search.GetAll();

      return res.status(200).json(all);
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json(error);
    }
  };

  public searchByProvince = async (
    req: Request<{ id: string }>,
    res: Response
  ) => {
    try {
      const { id } = req.params;
      const province = await this.Search.SearchById(id);

      return res.status(200).json(province);
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json({ message: "Internal Server error" });
    }
  };

  public searchByCountryId = async (
    req: Request<{ idCountry: string }>,
    res: Response
  ) => {
    try {
      const { idCountry } = req.params;

      const provices = await this.Search.SearchByCountry(idCountry);

      return res.status(200).json(provices);
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json({ message: "Internal Server error" });
    }
  };
}
