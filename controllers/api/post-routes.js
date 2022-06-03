const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// GET /api/posts
router.get('/', (req, res) => {
    console.log('=======================');
    // get all posts
    Post.findAll({
        order: [['created_at', 'DESC']],
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
                    // user who created comment
                    model: User,
                    attributes: ['username']
                }
            },
            {
                // user who created post
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// GET api/posts/:id
router.get('/:id', (req, res) => {
    // get one post by id
    Post.findOne({
        where: {
            id: req.params.id
        },
        attribues: [
            'id',
            'title',
            'post_text', 
            'created_at',
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
                include: {
                    // user that created the comment
                    model: User,
                    attributes: ['username']
                }
            },
            {
                // user that created the post
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
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// POST /api/posts
router.post('/', withAuth, (req, res) => {
     // expects {title: 'Taskmaster goes public!', post_text: 'this is what the post says', user_id: 1}
    Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// PUT /api/posts/:id
router.put('/:id', withAuth, (req, res) => {
    // UPDATE post title
    // expects {"title": "New Title"}
    Post.update(
        {
            title: req.body.title,
            post_text: req.body.post_text
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// DELETE /api/posts
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;