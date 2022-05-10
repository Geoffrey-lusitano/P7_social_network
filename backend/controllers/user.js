// Utilisation de l'algorithme de hachage Eksblowfish unidirectionnel (impossible de retrouver le mdp sans le sel + la clé + les passes que lalgo a utilisé)
const bcrypt = require('bcrypt');
// Utilisation de l'algorithme de token'
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { user } = new PrismaClient();

exports.signup = async (req, res) => {
    

    const userExists = await user.findUnique({
        where: {
            email: req.body.email
        },
        select: {
            email: true
        }
    })

    if(userExists) {
        return res.status(400).json({
            error: "Compte déjà existant"
        })
    } else {
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const email = req.body.email;
        if(email.match(regexEmail)) {
            // remplis la variable hashPassword avec un hash avec les données saisi dans password par l user
            const hashPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = await user.create({
                data: {
                    name: req.body.name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: hashPassword,
                    confirm_password: hashPassword
                }
            })
            res.status(201).json(newUser)
        } else {
            return res.status(401).json({ error: "Merci d'utilisé une adresse email"})
        }
    }
};

exports.login = async (req, res) => {

    const userExists = await user.findUnique({
        where: {
            email: req.body.email
        },
        select: {
            email: true,
            password: true,
        }
    })
    if (!userExists) {
        return res.status(401).json({ error: "Merci de créer un compte avant de vous connecter"})
    } 

    //return res.status(200).json({user: userExists});
    // on compare le mdp entré avec le hash dans la base de données
    const valid = await bcrypt.compare(req.body.password, userExists.password)
    if (!valid) {
        return res.status(401).json({ error: 'Mot de passe incorrect !'})
    } 

    return res.status(200).json({
        userId: user._id, 
        // création d'un token grace a l'userid + la cle secrete avec une durée de validité de 24h
        token: jwt.sign({ userId: user._id },
            `${process.env.MY_TOKEN}`,
            { expiresIn:'24h'})});
}
