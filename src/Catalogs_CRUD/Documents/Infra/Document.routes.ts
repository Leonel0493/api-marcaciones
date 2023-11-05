import { Router } from "express";
import { SequelizeRepository } from "./SequelizeRepository";
import { Save } from "../Application/Save";
import { Update } from "../Application/Update";
import { Delete } from "../Application/Delete";
import { Search } from "../Application/Search";
import { DocumentController } from "./DocumentsController";

// * init instance for Router
const routes = Router();

// * Get document repository
const sequelizeRepository = new SequelizeRepository();

// * setting use cases
const _save = new Save(sequelizeRepository);
const _update = new Update(sequelizeRepository);
const _delete = new Delete(sequelizeRepository);
const _search = new Search(sequelizeRepository);

// * inir controller for Documents
const documentController = new DocumentController(
  _save,
  _update,
  _search,
  _delete
);

// * set routes for each use case
routes.get("/", documentController.getAll);
routes.get("/:id", documentController.searchById);
routes.get("/byCountry/:id", documentController.searchByCountry);
routes.post("/", documentController.save);
routes.put("/", documentController.update);
routes.delete("/", documentController.delete);

export default routes;
