import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";

// * import routes
import CountryRoutes from "./Catalogs_CRUD/Country/Infra/Country.routes";
import ProvinceRoutes from "./Catalogs_CRUD/Province/Infra/Provinces.routes";

const app = express();

// * configure middeleware's
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// * api routes
app.use("/api/v1/country", CountryRoutes);
app.use("/api/v1/province", ProvinceRoutes);

// * config express
const port = process.env.API_PORT || 3000;

app.listen(port, () =>
  console.info(`marcaciones - API RUNNING ON PORT ${port}`)
);
