const {Router} = require("express");

const usersRoutes = require("./users.route");

const notesRoutes = require("./notes.route");

const tagsRoutes = require("./tags.routes");

const sessionRoutes = require("./session.routes");

const routes = Router();

routes.use("/users", usersRoutes);

routes.use("/sessions", sessionRoutes);

routes.use("/notes", notesRoutes);

routes.use("/tags", tagsRoutes);


module.exports = routes;

