import { Router } from "express";
import { SequelizeRepository } from "./SequelizeRepository";
import { Save } from "../Application/Save";
import { Update } from "../Application/Update";
import { Delete } from "../Application/Delete";
import { Search } from "../Application/Search";
import { ProvinceController } from "./ProvinceController";

// * init instance of Router
const routes = Router();

// * start DB infra
const sequelizeRepository = new SequelizeRepository();

// * init use cases
const _save = new Save(sequelizeRepository);
const _update = new Update(sequelizeRepository);
const _delete = new Delete(sequelizeRepository);
const _search = new Search(sequelizeRepository);

// * init controller
const provinceController = new ProvinceController(
  _save,
  _update,
  _delete,
  _search
);

// * set routes
routes.get("/", provinceController.getAll);
routes.get("/:id", provinceController.searchByProvince);
routes.get("/:idCountry", provinceController.searchByCountryId);
routes.post("/", provinceController.save);
routes.put("/", provinceController.update);
routes.delete("/", provinceController.deleted);

export default routes;
