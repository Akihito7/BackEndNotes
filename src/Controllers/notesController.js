const knex = require("../database/knex");

class notesController{

    async create(request,response){

        const {Title, Description ,links, tags } = request.body;

        const user_id = request.user.id;

        const note_id = await knex("notes").insert({
            Title,
            Description,
            user_id
        });

        


    const linkInsert = links.map(link => {
       return{
              
            note_id,
            url: link
             
        }
    });

        await knex("links").insert(linkInsert);

        const tagsInserts = tags.map(name => {
            return{
                
                note_id,
                name,
                user_id
            }
        });

        await knex("tags").insert(tagsInserts);

        response.json();

    }

    async showInfos(request, response){

        const { id } = request.params;

        const idNotes = await knex("notes").select('id').where({id})
         
        const notes = await knex("notes").where( {id}).first();

        const tags = await knex("tags").where({note_id: idNotes[0].id }).orderBy("name");

        const links = await knex("links").where({note_id: idNotes[0].id});
        
        return response.json({...notes,tags,links});

        
    }

    async delete(request, response){

        const {id} = request.params;

        await knex("notes").where({id:id}).delete();

        return response.json("deletado");
    }

    async index(request, response){

       const {title, tags} = request.query;

       const user_id = request.user.id;
       
       let notes;

       if(tags){

        const tagsFilter = tags.split(",").map(tag => tag.trim());

        notes = await knex("tags").select([
            "notes.id",
            "notes.Title",
            "notes.user_id"
        ])
        .innerJoin('notes', 'notes.id', 'tags.note_id')
        .where('notes.user_id', user_id).whereLike("Title", `%${title}%`)
        .whereIn('name', tagsFilter)
        .groupBy('notes.Title')
        .orderBy('notes.Title');
       
    }
    else if(title !== undefined){
        
        notes = await knex("notes").where({user_id})
        .whereLike("Title", `%${title}%` );
    }
    
        const userTags = await knex("tags").where({user_id});
       
        const notesWithTags = notes.map(note => {

        const notesTags = userTags.filter(tag => tag.note_id === note.id)

        return {
            ...note,
            tags: notesTags
        }
       })
       
        response.json(notesWithTags);
    }

    

}

module.exports = notesController;