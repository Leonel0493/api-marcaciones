import { Request, Response } from "express";
import { Save } from "../Application/Save";
import { Update } from "../Application/Update";
import { Delete } from "../Application/Delete";
import { Search } from "../Application/Search";
import { InvalidArgumentError } from "../../../Shared/Domain/InvalidArgumentError";

interface saveDataRquest {
  city: string;
  id_province: string;
  created_by: string;
}

interface updateDataRequest {
  id: string;
  city: string;
  id_province: string;
  modify_by: string;
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
}
