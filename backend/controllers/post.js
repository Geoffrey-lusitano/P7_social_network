const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
const { post } = new PrismaClient();
const jwt = require("jsonwebtoken");
const fs = require("fs");

function getUser(req) {
  const token = req.headers.authorization.split(" ")[1];
  // dechiffre le token a l'aide de la clé secrete et du token presant dans authorization
  const decodedToken = jwt.verify(token, `${process.env.MY_TOKEN}`);
  // Récuperation de l'userId presente dans l'objet decodedToken
  const userId = decodedToken.userId;
  return userId;
}
function getAdmin(req) {
  const token = req.headers.authorization.split(" ")[1];
  // dechiffre le token a l'aide de la clé secrete et du token presant dans authorization
  const decodedToken = jwt.verify(token, `${process.env.MY_TOKEN}`);
  // Récuperation de l'userId presente dans l'objet decodedToken
  const admin = decodedToken.admin;
  return admin;
}
exports.readPost = async (req, res, next) => {
  try {
    // const posts = await prisma.post.findMany({
    const posts = await post.findMany({
      orderBy: { createdAt: "desc" },
      include: { user: true, comments: true },
    });
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};

exports.createPost = async (req, res, next) => {
  if (req.file) {
    const { title, content, userId } = req.body;
    const newPost = {
      title,
      content,
      user: { connect: { id: parseInt(userId) } },
      attachment: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    };
    const result = await post.create({
      data: newPost,
    });
    res.json(result);
    console.log(result);
  } else {
    const { title, content, userId } = req.body;
    const newPost = {
      title,
      content,
      user: { connect: { id: parseInt(userId) } },
    };
    const result = await post.create({
      data: newPost,
    });
    res.json(result);
    console.log(result);
  }

  console.log("fincreatepost");
};

exports.deletePost = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const postExist = await post.findUnique({
    where: { id: parseInt(id) },
  });
  if (postExist) {
    const userProperties = parseInt(postExist.userId);
    console.log(postExist);
    if (userProperties === getUser(req) || getAdmin(req) === true) {
      if (postExist.attachment) {
        const filename = postExist.attachment.split("/images/")[1];
        fs.unlink(`images/${filename}`, async() => {
          const id = req.params.id;
          const deletePost = await post.delete({
            where: {
              id: parseInt(id),
            },
          });
          res.status(201).json({ deletePost });
        });
      } else {
        const id = req.params.id;
        const deletePost = await post.delete({
          where: {
            id: parseInt(id),
          },
        });
        res.status(201).json({ deletePost });
      }
    } else {
      return res
        .status(401)
        .json({ error: "Vous n'avez pas les droit pour modifier ce post" });
    }
  }
};
