const router = require ('express').Router();
const {Comment} = require ('../../models');
const withAuth = require ('../../utils/auth');

router.get ('/',withAuth, async (req,res)=> {
    try{
        const commentData = await Comment.findAll({
            include:[user],
        });
        const comments = commentData.map((comment) => comment.get({ plain: true }));

        console.log (comments);

        res.render ('single-post',{comments, logggIn: req.session.loggIn});
    }catch (err){
        res.status (500).json(err);
    }
});

router.get ('/',withAuth, async (req,res)=> {
    const body =req.body;

    try{
        const newComment = await Comment.create({
            ...body,
            userId: req.session.userId
        });
        res.json(newComment)
    }catch (err){
        res.status (500).json(err);
    }
});

module.exports = router;