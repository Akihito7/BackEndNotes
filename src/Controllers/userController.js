const appError = require("../utils/appError");

const {hash,compare} = require("bcrypt")

const sqliteConnection = require("../database/sqlite");


class userController {
 
  async create(request, response){

    const {name, email, password} = request.body;

    const database = await sqliteConnection();

    const checkUsersExists = await database.get("SELECT * FROM users WHERE email = (?)", email);

    if(checkUsersExists){

      throw new appError ("E-mail já em uso");

    } 

    const passwordHash = await hash(password, 8);

   await database.run("INSERT INTO users (name,email,password) VALUES (?,?,?)", [name,email,passwordHash]);

   response.status(201).json();

  }

  async update(request, response){

    const {name,email,password,old_password} = request.body;

    const user_id = request.user.id;

    const database = await sqliteConnection();

    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

      if(!user.id){

       throw new appError("User does not exist");

   }

    const checkEmailExists = await database.get("SELECT * FROM users WHERE email = ?",[email])
   
    if(checkEmailExists && checkEmailExists.id !== user.id){

      throw new appError("Existing email");
      
    }
    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if(password && !old_password){
      throw new appError("tell your old password before change to new password");
    }

    if(password && old_password){

      const checkPassword = await compare(old_password, user.password);

      if(!checkPassword){

        throw new appError("Senha antiga incorreta, por favor tente novamente");

      }
      user.password = await hash(password, 8);

    }

    await database.run(`UPDATE users SET
    name = ?,
    email = ?,
    password = ?,
    updated_at = DATETIME('now')
    WHERE id = ?`,[user.name,user.email,user.password,user_id]);

    return response.json()

  }

}

module.exports = userController;