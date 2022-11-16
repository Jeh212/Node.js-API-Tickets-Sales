import express from "express";
import "reflect-metadata";

import { indexRouter } from "./presentation/routes";

const app = express();

app.use(express.json());
app.use(indexRouter);

const Port = 3334;
app.listen(Port, () => console.log(`Server Running Port: ${Port}`));
