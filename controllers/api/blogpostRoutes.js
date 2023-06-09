const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// creating a post
router.get('/', withAuth, async (req, res) => {
    const body = req.body;
    console.log(body);
    try {
        const newPost = await Post.create({
            ...body,
            userId: req.session.userId
        });
        console.log('new post', newPost);
        res.json(newPost)
    } catch (err) {
        res.status(500).json(err);
    }
});

// update post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const [affectedRows] = await Post.update(req.body,{
            WHERE: {
                Id: req.params.id,
            }
    })
if (affectedRows > 0) {
    res.status(200).end()
} else {
    res.status(404).end()
}
    } catch (err) {
    res.status(500).json(err);
}
});

// delete post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const [affectedRows] = await Post.destroy({
            WHERE: {
                Id: req.params.id,
            }
        })
        if (affectedRows > 0) {
            res.status(200).end()
        } else {
            res.status(404).end()
        }
    } catch (err) {
        res.status(500).json(err);
    }
}); 

module.exports = router;