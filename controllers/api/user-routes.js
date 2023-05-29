const router = require ('express').Router();
const {User} = require ('../../models');

// signing up 
router.get ('/', async (req,res)=> {
    try{
        const newUser = await User.create({
            username:req.body.username,
            password:req.body.password
        });
       req.session.save(()=>{
        req.session.userId = newUser.Id;
        req.session.username = newUser.username;
        req.session.loggedIn = true;

        res.json(newUser);
       });
    }catch (err){
        res.status (500).json(err);
    }
});

// adding logIn
router.post ('/login', async (req,res)=> {
    try{
        const user = await User.findOne({
         where: {
            username:req.body.username,
         },
        });
        if (!user){
            res.status(400).json({message:'user account not found'});
            return;
        }

        const validPassword = user.checkPassword(req.body.password);
        if (!validPassword){
            res.status(400).json({message:'user account not found'});
            return;
        }

       req.session.save(()=>{
        req.session.userId = newUser.Id;
        req.session.username = newUser.username;
        req.session.loggedIn = true;

        res.json({user,message:'logged in!'});
       });
    }catch (err){
        res.status (400).json({message:'Account not found!'});
    }
});

// adding logout
router.post ('/logout', (req,res)=> {
    if (req.session.loggedIn){
        req.session.destroy (()=>{
            res.status(204).end();
        });
    } else{
        res.status (404).end();
    }
});
module.exports = router;