// Chargement express
const express = require('express');
// Permet d'enregistrer des routes pour acceder aux middleware
const router = express.Router();
// Chargement du fichier controllers/user
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
// ROUTES
// Route pour afficher les post
router.get('/', auth, postCtrl.readPost);
// Route pour créer un post
router.post('/', auth, multer, postCtrl.createPost);
// Route pour modifier un post
router.put('/:id', auth, multer, postCtrl.modifyPost);
// Route pour supprimer un post
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;