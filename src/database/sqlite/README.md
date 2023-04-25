const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path")


async function sqliteConnection(){
    const database = await sqlite.open({
        //onde vai salvar? filename, poderiamos navegar direto pelo filename, mas dependendo do sistam que as pessoas forem acessr o jeito de navegação não é o mesmo do windows e podia dar erros, e com o path resolve é como se fosse um tradutor vc fala pra onde vc quer ir no seu pc, mas caso alguem abra sua aplicação em um sistema diferente ele meio que traduz pra nao ter erros,
        filename: path.resolve(__dirname, "..", "database.db"),
        //agora precisamos dizer qual o driver de conexão vamos utitilizar
        driver: sqlite3.Database
    });

    return database;
}

module.exports = sqliteConnection;