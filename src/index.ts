import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";

const app = express();

// * configure middeleware's
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// * api routes

// * config express
const port = process.env.API_PORT || 3000;

app.listen(port, () =>
  console.info(`marcaciones - API RUNNING ON PORT ${port}`)
);
