const knex = require("../database/knex");
const appError = require("../utils/appError");
const diskStorage = require("../providers/DiskStorage");

const diskStorageX = new diskStorage();

class avatarController{

    async update(request,response){

        const id = request.user.id;
        const avatarFileName = request.file.filename;

        console.log(`step one ${id}, ${avatarFileName}`);

        const user = await knex("users").where({id}).first();
        console.log(user);

        if(!user){
            throw new appError("somente usuarios autenticados podem mudar o avatar", 401);
        }

         console.log(user.avatar);

        if(user.avatar){
            console.log("deletei relaxa")
            await diskStorageX.deleteFile(user.avatar);
        }
        console.log(user.avatar);

        const fileName = await diskStorageX.save(avatarFileName);

        user.avatar = fileName;

        console.log(user.avatar);

        await knex("users").update(user).where({id});
        

        console.log("cheguei no final")

        return response.json(user);

    }

}

module.exports = avatarController;