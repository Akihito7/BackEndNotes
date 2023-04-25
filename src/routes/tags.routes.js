const {Router} = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const routes = Router();

const tagsControll = require("../Controllers/tagsController");

const tagsController = new tagsControll();

routes.get("/:id",ensureAuthenticated, tagsController.showTags);

routes.get("/", ensureAuthenticated, tagsController.showAllTags);

module.exports = routes;