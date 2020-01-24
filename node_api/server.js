const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

//Iniciando o App
const app = express();
app.use(express.json()); // Permitir o envio de informações no formato Json
app.use(cors());

//Iniciando o DB
mongoose.connect('mongodb://localhost:27017/node_api', {useNewUrlParser:true, useUnifiedTopology: true });
requireDir('./src/models');



//Primeira rota
app.use('/api', require('./src/routes'));


app.listen(3001);
