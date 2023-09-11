import { Router } from "express";
import { SequelizeRepository } from "./SequelizeRepository";
import { Save } from "../Application/Save";
import { Update } from "../Application/Update";
import { Delete } from "../Application/Delete";
import { Search } from "../Application/Search";
import { CountryController } from "./CountryController";

// * init instance of Router
const routes = Router();

// * start current DB manager
const sequelizeRepository = new SequelizeRepository();

// * Start use cases
const _save = new Save(sequelizeRepository);
const _search = new Search(sequelizeRepository);
const _update = new Update(sequelizeRepository, sequelizeRepository);
const _delete = new Delete(sequelizeRepository);

// * Inizializate Controller
const countryController = new CountryController(
  _save,
  _update,
  _delete,
  _search
);

// * set routes for countries
routes.get("/", countryController.allCountries);
routes.get("/:id", countryController.search);
routes.post("/", countryController.save);
routes.put("/", countryController.update);
routes.delete("/", countryController.delete);

export default routes;
