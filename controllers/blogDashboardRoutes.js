const router = require('express').Router();
const { Post, User } = require('../models/');
const withAuth = require('../utils/auth');

// all post dashboard 
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: { "userId": req.session.userId },
            include: [User]
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(post);
        res.render('all-post', {
            layout: 'dashboard',
            posts,
        });
    } catch (err) {
        res.redirect('login');
    }
});
// after cliking on new post buttom
router.get('/new', withAuth, (req, res) => {
    res.render('new-post', {
        layout: 'dashboard',
    });
});

// when cliking on the post 
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        if (postData) {
            const post = postData.getn({ plain: true });
            console.log(post);
            res.render('edit-post', {
                layout: 'dashboard',
                post,
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.redirect('login');
    }
});

module.exports = router;