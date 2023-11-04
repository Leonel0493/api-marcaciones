import { Router } from "express";
import { SequelizeRepository } from "./SequelizeRepository";
import { Save } from "../Application/Save";
import { Update } from "../Application/Update";
import { Delete } from "../Application/Delete";
import { Search } from "../Application/Search";
import { CitiesController } from "./CityController";

// * init instance for router
const routes = Router();

// * Get repository for Cities
const sequelizeRepository = new SequelizeRepository();

// * setting uses cases
const _save = new Save(sequelizeRepository);
const _update = new Update(sequelizeRepository);
const _delete = new Delete(sequelizeRepository);
const _search = new Search(sequelizeRepository);

// * init CityController
const cityController = new CitiesController(_save, _update, _delete, _search);

// * setting routes for each action
routes.get("/", cityController.getAll);
routes.get("/:id", cityController.searchByCity);
routes.get("/byProvince/:idProvince", cityController.searchByProvinceId);
routes.post("/", cityController.save);
routes.put("/", cityController.update);
routes.delete("/", cityController.delete);

export default routes;
