const { Router } = require("express");

const sessionRouter = Router();

const sessionController = require("../Controllers/sessionController");

const sessionContollers = new sessionController();

sessionRouter.post("/", sessionContollers.create);

module.exports = sessionRouter;