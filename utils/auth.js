const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
    //if user is logged in, execute the route funtion that will allow them to view the page, called next() if the user is authenticated  
      next();
    }
  };
// user_id
  
  module.exports = withAuth;