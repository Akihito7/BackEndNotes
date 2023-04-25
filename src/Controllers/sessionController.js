const knex = require("../database/knex");

const AppError = require("../utils/appError");

const { compare,hash } = require("bcrypt");

const authConfig = require("../configs/auth");

const { sign } = require("jsonwebtoken");


class sessionController{
    async create(request,response){

        const {email , password} = request.body;

        const user = await knex("users").where({email}).first();
        

        if(!user){
            
            throw new AppError('E-mail ou senha inválidos', 401);
            
        }

        const passwordMatched = await compare(password, user.password);
       
        console.log(passwordMatched)
        

        if(!passwordMatched){

            console.log("a senha está inválida");
            throw new AppError("Email e/ou senha inválidas",401);
            

       }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({},secret,{
            subject: String(user.id),
            expiresIn
        })
        console.log("login feito com sucess")

        response.json({user,token});


    }
}

module.exports = sessionController;