const appError = require("../utils/appError");

const sqliteConnection = require("../database/sqlite");


class userController {
 
  async create(request, response){

    const {name, email, password} = request.body;
    //abaixo estamos atribuindo ao database a conexão com o banco de dados, com isso ele ganha alguns metodos que veremos abaixo ja que ele agora é o proprio sqlite
    const database = await sqliteConnection();

    //abaixo usamos o o metodo get do database que é o sqlite  para pegarmos uma informação usando o select do sqlite perguntamos se o email de algum usuario é igual o email que está sendo recebido pelo body da request se for igual retornara um true, e ira exibir um erro, usamos o (?) para interpolação em sqlite como visto abaixo
    const checkUsersExists = await database.get("SELECT * FROM users WHERE email = (?)", email);

    if(checkUsersExists){
      throw new appError ("E-mail já em uso");
    } 
   //aqui estamos pegando sqlite e executando um metodo run que vai dar a possibilidade de usarmos o insert into um comando do sqlite para inserir valores em tabelas nesse caso estamos cadastrando o nome,email e senha do usuario que mandar a requisição
   await database.run("INSERT INTO users (name,email,password) VALUES (?,?,?)", [name,email,password]);

   response.status(201).json();

  }
}

module.exports = userController;