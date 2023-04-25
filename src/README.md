require("express-async-errors");

const migrations = require("./database/sqlite/migrations");

const express = require("express");

const { request, response } = require("express");

const app = express();

app.use(express.json());

const appError = require("./utils/appError");



//abaixo estou usando o metodo get do express e o primeiro paratemetro é a routa que o get vai pegar e o segundo é uma função para indicar o que ele vai fazer quando for requisitado, ainda sem muita informção do request, o response é a resposta que ele vai dar, ali estou mostrando um hello world na page

//você tambem pode passar parametros pela a rota basta colocar /: e nome do parametro, e com o request você pode pegar o parametro passado pela a routa veja abaixo


//you too can give params in the route just put /: and name of params and with the request you can take the params past in the route see this bellow

//app.get("/users/:id/:name", (request, response) => {

    //const {id,name} = request.params;
  //  response.send(`Hello World, your id is ${id}
   // Your name is ${name}`);
//})

//diferança do route params e query params, basicamente o route params é algo obrigatorio da rota para funcionar porque ele faz parta da rota ja no query params é algo opcional a rota funcionara mesmo sem o query params


//e como passamos os valores? primeiro após passar a rota desejada, colocamos o ? e depois o nome da propridade que queremos atribuir um valor, e depois usamos o sinal = para atribuir o valor e se quisermos passar valores para mais de uma propriedade? é so usarmos o & e colocar o nome da propriedade e depois o = para atribuir o valor e se quiser colocar mais so seguir o mesmo procedimento. veja abaixo.

//http://localhost:3333/neymar?id=44&name=Neymar

//vamos instalar uma  biblioteca chamada nodemon que vai atualizar automaticamente para nós quando alguma alteração for feita na api, vamos colocar ela como uma ferramenta de dev isso quer dizer que quando a api estiver em produção ou seja rodando ele nao vai funcionar apenas quando estivermos desenvolvendo 
//app.get("/neymar", (request, response) => {

    //const {id,name} = request.query;
    //response.send(`your id is ${id} and your name is ${name}`)
    
    //})
    const routes = require("./routes");//por padrao qnd nao colocamos o nome do arquivo ela vai para o arquivo chamado index.
const createUsers = require("./database/sqlite/migrations/createUsers");
    app.use(routes);

    migrations();

    

    app.use((error, request, response, next) => {
        if(error instanceof appError){
            console.log(error)
            return response.status(error.statusCode).json({
                "status": "error",
                "message": error.message
            });
        }
        return response.status("500").json({
            "status": "error",
            "message": "Internal error server"
            
        });
    })

    

    

const PORT = 3333;
app.listen(PORT,() => console.log(`server is running on port ${PORT}`));


