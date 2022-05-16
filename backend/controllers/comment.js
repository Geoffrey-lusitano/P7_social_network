const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();
const { comment } = new PrismaClient();

exports.readComment = async (req, res, next) => {
    try {
        // const posts = await prisma.post.findMany({ 
        const comments = await comment.findMany({ 
            orderBy: { createdAt: 'desc'},
            // include: { user: true },
        });
        res.json(comments);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err});
    }
}
exports.createComment = async (req, res, next) => {
    try {
        const { content, userId, postId } = req.body;
        const result = await comment.create({ 
            data: {
                content,
                user : { connect: { id: userId}},
                post: { connect: {id: postId }},
            },
        });
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err});
    }
}
exports.modifyComment = async (req, res, next) => {

}
exports.deleteComment = async (req, res, next) => {

}
