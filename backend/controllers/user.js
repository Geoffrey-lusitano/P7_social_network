// Utilisation de l'algorithme de hachage Eksblowfish unidirectionnel (impossible de retrouver le mdp sans le sel + la clé + les passes que lalgo a utilisé)
const bcrypt = require("bcrypt");
// Utilisation de l'algorithme de token'
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { user } = new PrismaClient();

function getUser(req) {
  // donne pour valeur a token tout ce qu il y a apres le premiers espace du contenu d'authorization
  const token = req.headers.authorization.split(" ")[1];
  // dechiffre le token a l'aide de la clé secrete et du token presant dans authorization
  const decodedToken = jwt.verify(token, `${process.env.MY_TOKEN}`);
  //console.log(decodedToken);
  // Récuperation de l'userId presente dans l'objet decodedToken
  const userId = decodedToken.userId;
  return userId;
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await user.findMany();
    res.status(201).json(users);
  } catch (err) {
    return res.status(401).json({ err });
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const idP = parseInt(req.params.id);
    console.log(idP);
    const userSelect = await user.findUnique({
      where: {
        id: idP,
      },
    });
    res.status(201).json(userSelect);
  } catch (err) {
    return res.status(401).json({ err });
  }
};

exports.signup = async (req, res) => {
  const userExists = await user.findUnique({
    where: {
      email: req.body.email,
    },
    select: {
      email: true,
    },
  });

  if (userExists) {
    return res.status(400).json({
      error: "Compte déjà existant",
    });
  } else {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const email = req.body.email;
    if (email.match(regexEmail)) {
      // remplis la variable hashPassword avec un hash avec les données saisi dans password par l user
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = await user.create({
        data: {
          name: req.body.name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: hashPassword,
          confirm_password: hashPassword,
        },
      });
      res.status(201).json(newUser);
    } else {
      return res
        .status(401)
        .json({ error: "Merci d'utilisé une adresse email" });
    }
  }
};

exports.login = async (req, res) => {
  const userExists = await user.findUnique({
    where: {
      email: req.body.email,
    },
    select: {
      id: true,
      name: true,
      last_name: true,
      email: true,
      password: true,
    },
  });
  if (!userExists) {
    return res
      .status(401)
      .json({ error: "Merci de créer un compte avant de vous connecter" });
  }
  console.log(userExists.id);
  //return res.status(200).json({user: userExists});
  // on compare le mdp entré avec le hash dans la base de données
  const valid = await bcrypt.compare(req.body.password, userExists.password);
  if (!valid) {
    return res.status(401).json({ error: "Mot de passe incorrect !" });
  }

  return res.status(200).json({
    test: "test",
    user: userExists,
    userId: JSON.stringify(userExists.id),
    // création d'un token grace a l'userid + la cle secrete avec une durée de validité de 24h
    token: jwt.sign({ userId: userExists.id }, `${process.env.MY_TOKEN}`, {
      expiresIn: "24h",
    }),
  });
};

exports.deleteUser = async (req, res, next) => {
  const id = parseInt(req.params.id);
  console.log("getuser", getUser(req));
  console.log("id", id);
  if (id === getUser(req)) {
    const deleteUser = await user.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(201).json({ deleteUser });
  } else {
    return res
      .status(401)
      .json({ error: "Vous n'avez pas les droit pour supprimer ce compte" });
  }
};
