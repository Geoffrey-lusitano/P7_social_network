// Chargement express
const express = require('express');
// Permet d'enregistrer des routes pour acceder aux middleware
const router = express.Router();
// Chargement du fichier controllers/user
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');
// ROUTES
// Route pour afficher les post
router.get('/', auth, commentCtrl.readComment);
router.get('/:id', auth, commentCtrl.readOnComment);
// Route pour créer un post
router.post('/', auth, commentCtrl.createComment);
// Route pour modifier un post
router.put('/:id', auth, commentCtrl.modifyComment);
// Route pour supprimer un post
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;