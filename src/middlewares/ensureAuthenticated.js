const { verify } = require("jsonwebtoken");
const appError = require("../utils/appError");
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next){

    const authHeader = request.headers.authorization; //o token do usúario está no authorization

    console.log(authHeader);

    if(!authHeader){
        throw new appError("Token do usúario não informado");
    }

    const [,token] = authHeader.split(" "); // token = "bare xxxxxxx",após o split irá ficar assim ['bare', 'xxxxxxx]; e estou dizendo que vou pegar apenas a segunda posição do array e vou colocar o conteudo dentro de uma variavel chamada token;

    try {

        const {sub: user_id} = verify(token, authConfig.jwt.secret);

        request.user ={

            id: Number(user_id)

        }
        
        return next();

    } catch (error) {
        throw new appError(" JWT Token inválido",401);
    }
}
module.exports = ensureAuthenticated;