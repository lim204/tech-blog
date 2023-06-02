const router = require('express').Router();
const { User, Post, Comment} = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all blog posts to display on homepage
// router.get('/', async (req, res) => {
//   try {
//     const PostData = await Post.findAll({
//       include: [User],
//     });
//     const posts = PostData.map((post)=> post.get({plain:true}));

//     res.render('all-posts-admin', {
//       posts,
//       loggedIn:req.session.loggedIn
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// GET single post
// Use the custom middleware before allowing the user to access the gallery
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {id:req.params.id},
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
      console.log (post);
      res.render('single-post', { post, loggedIn:req.session.loggedIn});
    } else {
      res.status(404).end()
    }
    } catch(err) {
      res.status(500).json(err)
    }
  }),

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
      return;
    }

    res.render('login');
  });

  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
      return;
    }

    res.render('signup');
  });

  module.exports = router;
