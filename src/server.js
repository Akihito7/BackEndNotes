const migrations = require("./database/sqlite/migrations");

require("dotenv/config")

const cors = require("cors");

const uplodConfigs = require("./configs/uploads");

require("express-async-errors");

const express = require("express");

const { request, response } = require("express");

const app = express();

app.use(cors());

app.use(express.json());

app.use('/files', express.static(uplodConfigs.UPLOADS_FOLDER));

const appError = require("./utils/appError");

const routes = require("./routes");

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


const PORT = process.env.PORT || 3333;

app.listen(PORT,() => console.log(`server is running on port ${PORT}`));









