import express from "express";
var cors = require('cors')

import { router } from "./routes";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(router);

app.listen(3030, () => console.log("Server is running on http://localhost:3030!"));