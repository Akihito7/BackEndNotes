const Router = require("express");

const notesController = require("../Controllers/notesController");

const notesControll = new notesController();

const routes = Router();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

routes.use(ensureAuthenticated)

routes.get("/", notesControll.index);

routes.post("/", notesControll.create);

routes.get("/:id", notesControll.showInfos);

routes.delete("/:id", notesControll.delete);

module.exports = routes;

