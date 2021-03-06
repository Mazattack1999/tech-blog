const router = require('express').Router();
// const sequelize = require('../config/connection');
const {Post, User, Comment} = require('../models');
const withAuth = require('../utils/auth');

// GET and render all user's posts on dashboard
router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
          // use the ID from the session
          user_id: req.session.user_id
        },
        attributes: [
          'id',
          'title',
          'post_text',
          'created_at'
        ],
        include: [
          { 
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      })
    .then(dbPostData => {
        // serialize data before passing to template
        const posts = dbPostData.map(post => post.get({ plan: true }));
        res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// render create new post page
// /new-post
router.get('/new-post', withAuth, (req, res) => {
  const post = {
    title: "",
    post_text: ""
  };
  res.render('new-post', {
    post,
    loggedIn: true
  })
})

// allow user to edit post
router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
    where: {
        id: req.params.id
    },
    attributes: [
        'id',
        'title',
        'post_text',
        'created_at'
    ],
    include: [
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attribues: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }
    ]
})
.then(dbPostData => {
    if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
    }
    
    // serialize the data
    const post = dbPostData.get({ plain: true });

    // pass data to template
    res.render('edit-post', { 
        post,
        loggedIn: true
    });
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
})
})

module.exports = router;