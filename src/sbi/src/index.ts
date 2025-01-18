const express = require("express")
require("dotenv").config()
const { PORT } = require("./util/config")

const app = express();

app.listen(PORT, (error: Error) => {
    if(error){
        console.error("Error starting the server",error);
    }
    
    console.log(`Starting the http server for sbi bank on PORT:${PORT}`);
});