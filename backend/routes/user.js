// Chargement express
const express = require('express');
// Permet d'enregistrer des routes pour acceder aux middleware
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { user } = new PrismaClient();

// Chargement du fichier controllers/user
const userCtrl = require('../controllers/user');
// Password-validator
const passwordValidator = require('../middleware/password-validator');
// Definition de la route signup et execute le middleware signup 
router.post('/signup', passwordValidator, userCtrl.signup);
// Définition de la route login et execute le middleware login
router.post('/login', userCtrl.login);
router.get('/user', userCtrl.getAllUsers);
router.get('/user/:id', userCtrl.getOneUser);
module.exports = router;