const router = require('express').Router();
const { User, Post } = require('../models/index');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all blog posts to display on homepage
router.get('/', async (req, res) => {
  try {
    const blogPostData = await Post.findAll({
      include: [User],
    });

    const serializedPost = blogPostData.map((data) =>
      data.get({ plain: true })
    );

    res.render('displayAllPost', {
      serializedPost
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET single post
// Use the custom middleware before allowing the user to access the gallery
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true })
      res.render('single-post', { post })
    } else {
      res.status(400).end()
    }
    } catch(err) {
      res.status(500).json(err)
    }
  }),

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }

    res.render('login');
  });

  router.get('/register', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }

    res.render('register');
  });

  module.exports = router;
