const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
  User.hasMany(Post, {
    foreignKey: "user_id",
  })
  
  //////////////////////////////////////////
  Post.hasMany(Comment, {
    foreignKey: 'post_id',
    // onDelete: 'CASCADE'
  });
  
  // add the other side of above relationship
  Comment.belongsTo(Post, {
    foreignKey: "post_id"
  })
  
  
  /////////////////////////////////////
  Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
  // add the other side of the above relationship
  User.hasMany(Comment, {
    foreignKey: "user_id"
  })
  
  module.exports = {
    User,
    Comment,
    Post
  };

module.exports = { User, Post, Comment };