/* eslint-disable @typescript-eslint/no-var-requires */
import express, { json, urlencoded } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(json());
app.use(
  urlencoded({
    extended: true,
  })
);

require("@src/routes/register.routes")(app);
require("@src/routes/auth.routes")(app);
require("@src/routes/user.routes")(app);
require("@src/routes/redoc.routes")(app);

export default app;