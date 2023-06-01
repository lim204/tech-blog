const dashboardRouter = require('express').Router();
const { Post } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');


dashboardRouter.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                userId: req.session.userId,
            },
        })
        const blogPosts = postData.map((post) => post.get({ plain: true }))
        res.render('displayAllPostAdmin', {
            layout: 'dashboard',
            blogPosts,
        })
    } catch (err) {
        res.redirect('login')
    }
})
// showing new post
dashboardRouter.get('/new', withAuth, (req, res) => {
    res.render('newPost', {
      layout: 'dashboard',
    })
  })

// edith a post page
dashboardRouter.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await BlogPost.findByPk(req.params.id);

        if (postData) {
            const blogPost = postData.get({ plain: true })

            res.render('edit-post', {
                layout: 'dashboard',
                blogPost,
            })
        } else {
            res.status(404).end()
        }
    } catch (err) {
        res.redirect('login');
    }
});

module.exports = dashboardRouter;
