const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require ('../../utils/helpers')

// loging new user
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username, }
    });
    if (!userData) {
      res.status(400).json({ message: 'Account not found. Please try again!' });
      return;
    }

    const validPassword = userData.comparePassword(req.body.password)
    if (!validPassword){
      res.status(400).json({message:'password is invalid, please try again!'})
      return
    }

    req.session.save(() => {
      req.session.userId = userData.id
      req.session.userName = userData.username
      req.session.loggedIn = true;

      res.json({ userData, message: 'You have logged in' })
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Account not found!' });
  }
});

// creating a new user
router.post('/register', async (req, res) => {
  try {
    const registerUser = await User.create(req.body)
    // saving user data to session storage in DB
    req.session.save(() => {
      req.session.userId = registerUser.id
      req.session.username = registerUser.username
      req.session.loggedIn = true

      res.json({
        registerUser,
        message: `${registerUser.username} Account has been created!`,
      })
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
