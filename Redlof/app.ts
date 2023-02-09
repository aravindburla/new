import express from "express";

import { databaseLoader } from "./Engine/Loaders/database";
import { config } from "dotenv";
config();
databaseLoader();
import router from "./Modules";
const app = express();

app.use(express.json());

app.use("/api", router);

app.listen(process.env.PORT || 3001, () => {
  console.log("server is running");
});
