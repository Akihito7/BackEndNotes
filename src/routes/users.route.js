const {Router} = require("express");

const userController = require("../Controllers/userController");

const avatarController = require('../Controllers/userAvatarController');

const multerConfigs = require("../configs/uploads");

const multer = require("multer")

const uploads = multer(multerConfigs.MULTER);

const usersRoutes = Router();

const UserController = new userController();

const AvatarController = new avatarController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

usersRoutes.post("/", UserController.create);

usersRoutes.put("/", ensureAuthenticated , UserController.update);

usersRoutes.patch("/avatar", ensureAuthenticated, uploads.single("avatar"), AvatarController.update);

module.exports = usersRoutes;