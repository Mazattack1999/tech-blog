const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// /api/comments
router.get('/', (req, res) => {
    // GET all comments
    Comment.findAll()
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// /api/comments
router.post('/', withAuth, (req, res) => {
    // check the session
    if (req.session) {
        // CREATE a comment
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    }
    
})

// PUT /api/comments/:id
router.put('/:id', withAuth, (req, res) => {
    // UPDATE comment text
    // expects {"title": "New Title", "post_text": "new text"}
    Comment.update(
        {
            comment_text: req.body.comment_text
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// /api/comments/:id
router.delete('/:id', (req, res) => {
    // DELETE a comment by id
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData){
            res.status(404).json('No comment found with ths id')
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

module.exports = router;