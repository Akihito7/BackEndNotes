const knex = require("../database/knex");
const appError = require("../utils/appError");
const diskStorage = require("../providers/DiskStorage");

const diskStorageX = new diskStorage();

class avatarController{

    async update(request,response){

        const id = request.user.id;

        const avatarFileName = request.file.filename;

        const user = await knex("users").where({id}).first();

        if(!user){

            throw new appError("somente usuarios autenticados podem mudar o avatar", 401);

        }

        if(user.avatar){

            await diskStorageX.deleteFile(user.avatar);

        }

        const fileName = await diskStorageX.save(avatarFileName);

        user.avatar = fileName;

        await knex("users").update(user).where({id});
    
        return response.json(user);

    }

}

module.exports = avatarController;