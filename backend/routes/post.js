// Chargement express
const express = require('express');
// Permet d'enregistrer des routes pour acceder aux middleware
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { user } = new PrismaClient();

// Chargement du fichier controllers/user
const postCtrl = require('../controllers/post');
// ROUTES
// Route pour afficher les post
router.get('/', postCtrl.readPost);
// Route pour créer un post
router.post('/', postCtrl.createPost);
// Route pour modifier un post
router.put('/', postCtrl.modifyPost);
// Route pour supprimer un post
router.delete('/', postCtrl.deletePost);


module.exports = router;