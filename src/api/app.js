const express = require("express");
const Router = express.Router;
const v1Router = require("./routes/V1Router");
const cors = require("cors");

class App {
  constructor() {
    const app = express();
    this.express = app;

    // JSON API router
    const jsonApiRouter = Router();
    jsonApiRouter.use(cors(), express.json());
    jsonApiRouter.use('/', v1Router());
    app.use('/', jsonApiRouter);

  }
}

module.exports = App;
