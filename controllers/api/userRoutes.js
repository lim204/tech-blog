const router = require('express').Router();
const { User } = require('../../models');

// signing up  new user
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
        name: req.body.name, 
        password: req.body.password
    });
      // saving user data to session storage in DB
      req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.userName = newUser.name;
      req.session.loggedIn = true;

      res.json({ newUser, message: 'You have created an account' })
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// loging in 
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    }) 
    if (!user){
      res.status(400).json({
        message: 'Account not found!',
      });
      return;
    }
    const validPassword  = user.checkPassword(req.body.password);
    if (!validPassword){
      res.status(400).json({message:'Invalid password!'});
      return;
    };
    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.name;
      req.session.loggedIn = true;

      res.json({
        user,
        message:'You have logged in!' ,
      })
    })
  } catch (err) {
    res.status(400).json({message:'User account not found!'})
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
