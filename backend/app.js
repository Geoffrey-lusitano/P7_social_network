// Chargement du framework express qui utilise NOde afin de facilité la création et la gestion des serveurs Node (logiciel qui permet d'ecrire toutes les taches coté serveur en javascript)
const express = require('express');
// Variable app afin d'utiliser express
const app = express();

// CORS partage des ressources entre origines multiple, permet d'ajouter des en-têtes HTTP afin de permettre à un agent utilisateur d'accéder à des ressources d'un serveur situé sur une autre origine que le site courant.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });  

// exécute express
app.use(express.json());

module.exports = app;