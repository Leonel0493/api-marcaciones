import { Request, Response } from "express";
import { Save } from "../Application/Save";
import { Update } from "../Application/Update";
import { Delete } from "../Application/Delete";
import { Search } from "../Application/Search";
import { InvalidArgumentError } from "../../../Shared/Domain/InvalidArgumentError";
import { IUpdateCity } from "../Domain/ICity";

interface saveDataRquest {
  city: string;
  id_province: string;
  created_by: string;
}

interface updateDataRequest {
  id: string;
  city: string;
  id_province: string;
  modified_by: string;
}

export class CitiesController {
  constructor(
    private Save: Save,
    private Update: Update,
    private Delete: Delete,
    private Search: Search
  ) {}

  public save = async (req: Request<{}, {}, saveDataRquest>, res: Response) => {
    try {
      const { city, id_province, created_by } = req.body;
      const savedCity = await this.Save.Save(city, id_province, created_by);

      return res.status(201).json(savedCity);
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json({ message: "Internal Server error" });
    }
  };

  public update = async (
    req: Request<{}, {}, updateDataRequest>,
    res: Response
  ) => {
    try {
      const { id, city, id_province, modified_by } = req.body;
      const newData: IUpdateCity = {
        city,
        id_province,
        modified_by,
      };

      const updateCity = await this.Update.Update(id, newData);

      return res.status(200).json(updateCity);
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  public delete = async (req: Request<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params;

      const isDisabled = await this.Delete.Delete(id);

      return isDisabled
        ? res.status(200).json({ message: "La ciudad fue eliminada" })
        : res.status(400).json({
            message:
              "Lo sentimos no hemos podido eliminar la ciudad, intente mas tarde.",
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

  public searchByCity = async (req: Request<{ id: string }>, res: Response) => {
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

  public searchByProvinceId = async (
    req: Request<{ idProvince: string }>,
    res: Response
  ) => {
    try {
      const { idProvince } = req.params;

      const provices = await this.Search.SearchByProvince(idProvince);

      return res.status(200).json(provices);
    } catch (error) {
      if (error instanceof InvalidArgumentError)
        return res.status(400).json({ message: error.message });

      return res.status(500).json({ message: "Internal Server error" });
    }
  };
}
