const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();
const { post } = new PrismaClient();

function getUser (req) {
    const token = req.headers.authorization.split(' ')[1];
    // dechiffre le token a l'aide de la clé secrete et du token presant dans authorization
    const decodedToken = jwt.verify(token, `${process.env.MY_TOKEN}`);
    // Récuperation de l'userId presente dans l'objet decodedToken
    const userId = decodedToken.userId;
    return userId;
}
exports.readPost = async (req, res, next) => {
    try {
        // const posts = await prisma.post.findMany({ 
        const posts = await post.findMany({ 
            orderBy: { createdAt: 'desc'},
            include: { user: true, comments: true },
        });
        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err});
    }
}

exports.createPost = async (req, res, next) => {
    try {
        const { title, content, userId, } = req.body;
        const result = await post.create({
            data: {
                title,
                content,
                user: { connect: { id: userId} },
            },
        });
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err});
    }
}

exports.modifyPost = async (req, res, next) => {
    try {

        const { id, title, content, userId } = req.body;
        const postExist = await post.findUnique ({
            where: { id: id },
        });
        //res.status(200).json({postExist});
        if (postExist) {
            const updatePost = await post.update({
                where: {
                    id: id,
                },
                data: {
                    title: title,
                    content: content,
                    user: { connect: { id: userId} },
                },
            });
            res.status(201).json({updatePost});
        }

    } catch (err) {
        res.status(400).json({ error: err});
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletePost = await post.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.status(201).json({deletePost});
    } catch (err) {
        res.status(400).json({ error: err});
    }
}