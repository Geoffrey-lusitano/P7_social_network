const { PrismaClient } = require('@prisma/client');
const { user, post } = new PrismaClient();

exports.readPost = async (req, res, next) => {
    try {
        const posts = await prisma.post.findMany({ 
            where: { published: true },
            orderBy: { createAt: 'asc'},
            include: { user: true, comments: true },
        })
        res.json(posts);
    } catch (err) {
        res.status(400).json({ error: err});
    }
}

exports.createPost = async (req, res, next) => {
    try {
        const { title, content, createAt, comment, userName, userLast_name } = req.body;
        const result = await prisma.post.create({
            data: {
                title,
                content,
                createAt,
                published: false,
                user: { connect: { name: userName, lastName: userLast_name} },
                comment,
            },
        })
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err});
    }
}

exports.modifyPost = async (req, res, next) => {

}

exports.deletePost = async (req, res, next) => {

}