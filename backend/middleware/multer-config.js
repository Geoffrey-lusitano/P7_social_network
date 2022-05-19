// Chargement de multer
const multer = require('multer');

// dictionnaire minetype pour la gestion des extension
const MINE_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
};
// fonction diskStorage pour enregistrer
const storage = multer.diskStorage({
    // Lieux ou on enregistre les fichiers
    destination: (req, file, callback) => {
        // Telecharge les fichiers dans le dossier images
        callback(null, 'images')
    },
    // donne un nom de fichier unique pour eviter que  2 fichier du meme nom soient stocké
    filename: (req, file, callback) => {
        // Generation du nom avec le nom d'origine du fichier et remplacement des possibles espaces par des _
        const name = file.originalname.split(' ').join('_');
        
        // donner une extention au fichier via le minetype
        const extension = MINE_TYPES[file.mimetype];
        console.log(extension);
        // appel de la fonction pour la génération du nom de fichier avec la date de depot pour le rendre unique
        callback(null, name + Date.now() + '.' + extension);
    }
});
// export du middleware avec ma methode single pour fichier unique et que ce sont des images
module.exports = multer({ storage: storage }).single('image');