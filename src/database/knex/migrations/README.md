

exports.up = function(knex){
    //up está recebendo uma função que tem um parametro de entrada knex, qnd up é executado ele retorna para quem chamou um knex.schema esse knex.schema tem uma função de criar tabelas no banco de dados então vc coloca knex.schema.createTable("nomeDaTable", table => {aqui dentro vc vai retornar para quem chamar a estrutura do seu banco de dados escrito em queryBuilder e ele vai traduzir para o banco de dados que esta definido na configurações do seu arquivo knexfile.js})

    //return knex.schema.createTable("notes", table => {
        //table.increments("id");
        //table.text("Title");

    //});


    //todo arquivo de migration knex tem duas funções up e down o up serve para criar tabelas e down serve para deletar tabelas dropar;

}


exports.down = function(knex) {
  
};
