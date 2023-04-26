const knex = require("../database/knex")

class tagsController {

    async showTags(request, response){

        const { id } = request.params;
         
        const tags = await knex("tags").where("user_id", id);

        response.json(tags)
    }

    async showAllTags(request,response) {

        const user_id = request.user.id;

        const data = await knex("tags").where({user_id}).groupBy('name')

        return response.json(data);
        
    }
}

module.exports = tagsController;