const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// creating post

router.post('/', withAuth, async (req, res) => {
    const body = req.body;
    console.log(body);

    try {
        const newPost = await Post.create({
            ...body,
            userId: req.session.userId
        });
        res.json(newPost)
    } catch (err) {
        console.log('Ooops failed', err);
        res.status(500).json(err);
    }
});
// update Post
router.put('/:id', withAuth, async (req, res) => {
    try {
        console.log(req.body);
        const [affectedRow] = await Post.update(req.body, {
            where: {
                id: req.params.id,
            }
        })

        if (affectedRow > 0) {
            res.status(200).end ();
        }else{
            res.status(404).end();
        }
    }catch (err){
        res.status(500).json(err);
        }
});

// deleating post
router.delete('/', withAuth, async (req, res) => {
    try {
        const [affectedRow] = Post.destroy({
           where:{
            id:req.params.id,
           }  
        });
        
        if (affectedRow > 0) {
            res.status(200).end ();
        }else{
            res.status(404).end();
        }
    } catch(err){
        res.status(500).json(err);
    }
});


module.exports = router;