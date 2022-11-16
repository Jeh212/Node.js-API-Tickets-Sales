import "reflect-metadata";

import express from "express";
import { indexRouter } from "./presentation/routes";
const app = express();

app.use(express.json());

app.use(indexRouter);
app.listen(3333, () => console.log(" Client Server Running"));
