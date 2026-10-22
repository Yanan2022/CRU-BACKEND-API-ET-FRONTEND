const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');
const app = express();
const env = process.env;

app.use(cors());
app.use(bodyParser.json())


const categoryRoute = require('./src/routes/categories')
const api = env.API_URL

app.use(`${api}/categorie`, categoryRoute )

/**
 * @author : TOURE YANAN 
 * Configuration de la base de donnees et du serveur
 */

const port = env.PORT || 8081
const hostname = env.HOSTNAME || '0.0.0.0'
const serveur = env.serveur || 'localhost:27017';
const db = env.DB || 'api_backend_db'

// Connexion a la base de donnees mongodb
mongoose.connect(`mongodb://${serveur}/${db}`)
        .then( ()=>{
            console.log(`Connexion à mongoDB réussie`);
        })
        .catch( (error)=> console.error(error) )

//Creation du serveur
app.listen(port, ()=>{
    console.log(`Serveur lancé sur http://${hostname}:${port}`)
} )