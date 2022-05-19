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
        console.log(content);
        console.log(userId);
        console.log(postId);
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
    try {

        const { id, content, userId, postId } = req.body;
        const commentExist = await comment.findUnique ({
            where: { id: id },
        });
        //res.status(200).json({postExist});
        if (commentExist) {
            const updateComment = await comment.update({
                where: {
                    id: id,
                },
                data: {

                    content: content,
                    user: { connect: { id: userId} },
                    post: { connect: { id: postId} },
                },
            });
            res.status(201).json({updateComment});
        }

    } catch (err) {
        res.status(400).json({ error: err});
    }
}
exports.deleteComment = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleteComment = await comment.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.status(201).json({deleteComment});
    } catch (err) {
        res.status(400).json({ error: err});
    }
}
