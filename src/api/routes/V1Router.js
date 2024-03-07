const { Router } = require("express");
const { registerFormRoutes } = require("./controllers/FormController");

const v1Router = () => {
  // Router structure
  const router = Router();

  registerFormRoutes(router);

  return router;
};

module.exports = v1Router;
