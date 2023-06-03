const router = require('express').Router();
const { Post } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// all posts dashboard
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                userId: req.session.userId,
            },
        })
        const posts = postData.map((post) => post.get({ plain: true }))
        console.log(posts);
        res.render('userpost', {
            layout: 'dashboard',
            posts,
        })
    } catch (err) {
        res.redirect('login')
    }
})
// showing new post
router.get('/new', withAuth, (req, res) => {
    res.render('new-post', {
      layout: 'dashboard',
    });
  });

// edith a post page
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        if (postData) {
            const post = postData.get({ plain: true })

            res.render('edit-post', {
                layout: 'dashboard',
                post,
            })
        } else {
            res.status(404).end()
        }
    } catch (err) {
        res.redirect('login');
    }
});

module.exports = router;
