// authentication function provided by University of Wisconsin Coding Bootcamp lessons

const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }
}

module.exports = withAuth;